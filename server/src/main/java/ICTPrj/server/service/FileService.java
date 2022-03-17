package ICTPrj.server.service;

import ICTPrj.server.domain.repository.FileRepository;
import ICTPrj.server.dto.MakeupDto;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.Headers;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.URL;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Transactional
public class FileService {
    private final FileRepository fileRepository;
    private final AmazonS3 s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Value("${flask.url}")
    private String flaskUrl;

    @Value("${cloud.aws.s3.fileprefix}")
    private String filePrefix;

    public String GeneratePreSignedUrl(String fileName){

        String preSignedUrl = "";

        Date expiration = new Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += 1000*60*60;
        expiration.setTime(expTimeMillis);

        GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(bucketName, fileName)
                .withMethod(HttpMethod.PUT)
                .withExpiration(expiration);

        generatePresignedUrlRequest.addRequestParameter(
                Headers.S3_CANNED_ACL,
                CannedAccessControlList.PublicRead.toString()
        );

        URL url = s3Client.generatePresignedUrl(generatePresignedUrlRequest);
        preSignedUrl = url.toString();
        
        return preSignedUrl;
    }

    public MakeupDto MakeUp(String uuid){
        MakeupDto reqDto = MakeupDto.builder().file(uuid).build();
        WebClient webClient = WebClient.create(flaskUrl);
        String ret = webClient.post()
                .uri("/makeup")
                .body(Mono.just(reqDto), MakeupDto.class)
                .retrieve()
                .bodyToMono(String.class).block();
        MakeupDto retDto = MakeupDto.builder().file(filePrefix + ret).build();
        return retDto;
    }
}
