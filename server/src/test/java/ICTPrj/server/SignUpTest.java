package ICTPrj.server;

import ICTPrj.server.dto.UserDto;
import ICTPrj.server.service.SignUpService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class SignUpTest {
    @Autowired
    private SignUpService signUpService;

    @Test
//    @Order(1)
    @DisplayName("회원가입 테스트")
    public void SignUp() throws Exception {
        // Given
        UserDto userDto = UserDto.builder()
                .email("test@naver.com")
                .nickname("test")
                .password("123")
                .profile("test").build();

        // when
        UserDto newUser = signUpService.SignUp(userDto);

        // then
        assertEquals(userDto.getEmail(), newUser.getEmail());
    }
}
