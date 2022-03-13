package ICTPrj.server.controller;

import ICTPrj.server.dto.FileDto;
import ICTPrj.server.dto.FilePathDto;
import ICTPrj.server.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Iterator;

@RestController
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;

    @PostMapping("/getUrl/makeup")
    public ArrayList<String> returnPreSignedUrl(@RequestBody FileDto fileDto){
        Iterator<FilePathDto> iter = fileDto.getFiles().iterator();
        ArrayList<String> filePathes = new ArrayList<String>();
        while(iter.hasNext()) {
            FilePathDto filePath = iter.next();
            String fp = fileService.GeneratePreSignedUrl(filePath.getPath());
            filePathes.add(fp);
        }
        return filePathes;
    }
}
