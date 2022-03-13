package ICTPrj.server;

import ICTPrj.server.domain.entity.File;
import ICTPrj.server.domain.repository.FileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
public class test {
    //given
    @Autowired
    FileRepository fileRepository;

    @Test
    public void test(){
        List<File> files = fileRepository.findAll();
        System.out.println(files.get(0).toString());
    }
}
