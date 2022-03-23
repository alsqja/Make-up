package ICTPrj.server;

import ICTPrj.server.domain.entity.User;
import ICTPrj.server.domain.repository.UserRepository;
import ICTPrj.server.dto.*;
import ICTPrj.server.jwt.TokenProvider;
import ICTPrj.server.service.FollowService;
import ICTPrj.server.service.PostService;
import ICTPrj.server.service.SignInService;
import ICTPrj.server.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional
public class UserTest {
    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private FollowService followService;

    @Autowired
    private SignInService signInService;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private UserRepository userRepository;

    private String getAccessToken() {
        UserDto userDto = UserDto.builder()
                .email("user@naver.com")
                .password("123").build();

        TokenDto accessToken = signInService.signIn(userDto);
        return "7777777" + accessToken.getAccessToken();
    }

    private User getUser(String userToken) {
        String userToken_ = userToken.substring(7);
        String userEmail = tokenProvider.getUserEmailFromToken(userToken_);
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "없는 사용자 입니다."));
        return user;
    }

    @Test
    @DisplayName("유저 수정 테스트")
    public void editUserTest() {
        // Given
        String userToken = getAccessToken();
        EditUserDto editUserDto = EditUserDto.builder()
                .newPassword("1234")
                .nickname("test")
                .oldPassword("123")
                .profile("testset")
                .build();

        // When
        IdDto idDto = userService.updateUser(userToken, editUserDto);

        // Then
        assertEquals(getUser(userToken).getId(), idDto.getId());
    }

    @Test
    @DisplayName("유저 삭제 테스트")
    public void deleteUserTest() {
        String userToken = getAccessToken();

        userService.deleteUser(userToken);

        assertEquals(true, true);
    }

    @Test
    @DisplayName("유저 정보 가져오기")
    public void getUserInfoTest() {
        String userToken = getAccessToken();
        Long userId = 8L;
        Long cursor = 8L;

        UserPageDto userPageDto = userService.getUserInfoById(userId);
        UserWithFollowDto userWithFollowDto = followService.signin(userPageDto.getEmail());
        List<PostDto> postList = postService.getPostList(userId, cursor, 0).getPosts();

        long postsLength = userPageDto.getCount();
        boolean isFollow = userService.checkFollow(userToken, userId);

        UserInfoDto userInfoDto = UserInfoDto.builder()
                .user(userWithFollowDto)
                .count(postsLength)
                .posts(postList)
                .isFollow(isFollow)
                .build();

        assertEquals(userInfoDto.getUser().getId(), userId);
    }




}
