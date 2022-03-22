package ICTPrj.server;

import ICTPrj.server.dto.TokenDto;
import ICTPrj.server.dto.TokenWithUserDto;
import ICTPrj.server.dto.UserDto;
import ICTPrj.server.dto.UserWithFollowDto;
import ICTPrj.server.service.FollowService;
import ICTPrj.server.service.SignInService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional
public class SignInTest {
    @Autowired
    private SignInService signInService;

    @Autowired
    private FollowService followService;

    @Test
    @DisplayName("토큰 받기 테스트")
    public void accessTokenTest() throws Exception {
        // Given
        UserDto userDto = UserDto.builder()
                .email("user@naver.com")
                .password("123").build();

        // When
        TokenDto accessToken = signInService.signIn(userDto);

        // Then
        System.out.println("Access Token check : " + accessToken);
    }

    @Test
    @DisplayName("로그인 시 팔로우 받기 테스트")
    public void followSignInTest() throws Exception {
        // Given
        UserDto userDto = UserDto.builder()
                .email("user@naver.com")
                .password("123").build();
        TokenDto accessToken = signInService.signIn(userDto);

        // When
        UserWithFollowDto userWithFollowDto = followService.signin(userDto.getEmail());

        // Then
        TokenWithUserDto tokenWithUserDto = TokenWithUserDto.builder()
                .accessToken(accessToken.getAccessToken())
                .user(userWithFollowDto)
                .build();

        assertEquals(accessToken, tokenWithUserDto.getAccessToken());
    }
}
