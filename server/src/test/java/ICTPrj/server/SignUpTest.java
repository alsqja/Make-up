//package ICTPrj.server;
//
//import ICTPrj.server.domain.entity.User;
//import ICTPrj.server.domain.repository.UserRepository;
//import ICTPrj.server.dto.UserDto;
//import ICTPrj.server.service.SignUpService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//
//
//@SpringBootTest
//@Transactional
//public class SignUpTest {
//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    SignUpService signUpService;
//
//    @Test
//    public void SignUp() throws Exception {
//        // Given
//        UserDto userDto = new UserDto();
//        userDto.setEmail("abc@naver.com");
//        userDto.setNickname("test");
//        userDto.setPassword("123");
//        userDto.setProfile("hi");
//
//        // when
//        Long userID = signUpService.SignUp(userDto);
//
//        // then
//        System.out.println(userID);
//    }
//}
