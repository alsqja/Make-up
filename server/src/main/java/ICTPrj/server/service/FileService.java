package ICTPrj.server.service;

import ICTPrj.server.domain.repository.FileRepository;
import ICTPrj.server.dto.MakeupDto;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.Headers;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.S3Object;
import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import javax.net.ssl.SSLException;
import java.io.FileNotFoundException;
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
        String ret;
        try{
            S3Object o = s3Client.getObject(bucketName, uuid + "/result/result.png");
            ret = uuid + "/result/result.png";
        }catch (AmazonServiceException e) {
            MakeupDto reqDto = MakeupDto.builder().file(uuid).build();
//            HttpClient httpClient = HttpClient.create().secure(t -> {
//                try {
//                    t.sslContext(SslContextBuilder.forClient().trustManager(InsecureTrustManagerFactory.INSTANCE).build());
//                } catch (SSLException er){
//                    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "접근할 수 없습니다.");
//                }
//            });
            WebClient webClient = WebClient.builder()
                    .baseUrl(flaskUrl)
//                    .clientConnector(new ReactorClientHttpConnector(httpClient))
                    .build();

            try {
                ret = webClient.post()
                        .uri("/makeup")
                        .body(Mono.just(reqDto), MakeupDto.class)
                        .retrieve()
                        .bodyToMono(String.class).block();
            }

            catch(Exception er) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미지에 얼굴이 없습니다.");
            }
        }
        MakeupDto retDto = MakeupDto.builder().file(filePrefix + ret).build();
        return retDto;
    }
}
