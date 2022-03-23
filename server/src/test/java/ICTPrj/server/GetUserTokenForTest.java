package ICTPrj.server;

import ICTPrj.server.dto.TokenDto;
import ICTPrj.server.dto.UserDto;
import ICTPrj.server.service.SignInService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;


@SpringBootTest
@Transactional
public class GetUserTokenForTest {

    @Autowired
    private SignInService signInService;

    @Test
    protected String getAccessToken() {
        UserDto userDto = UserDto.builder()
                .email("user@naver.com")
                .password("123").build();

        TokenDto accessToken = signInService.signIn(userDto);
        return "7777777" + accessToken.getAccessToken();
    }
}
