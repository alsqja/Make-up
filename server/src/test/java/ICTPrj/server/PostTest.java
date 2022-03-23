package ICTPrj.server;

import ICTPrj.server.dto.PostDto;
import ICTPrj.server.dto.PostListDto;
import ICTPrj.server.dto.TokenDto;
import ICTPrj.server.dto.UserDto;
import ICTPrj.server.service.PostService;
import ICTPrj.server.service.SignInService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional
public class PostTest {
    @Autowired
    private PostService postService;

    @Autowired
    private SignInService signInService;

    private GetUserTokenForTest getUserTokenForTest;

    protected String getAccessToken() {
        UserDto userDto = UserDto.builder()
                .email("user@naver.com")
                .password("123").build();

        TokenDto accessToken = signInService.signIn(userDto);
        return "7777777" + accessToken.getAccessToken();
    }

    @Test
    @DisplayName("게시글 하나 받기 테스트")
    public void getOnePostTest() {
        // Given
        Long postId = 1L;

        // When
        PostDto postDto = postService.readPost(postId);

        // Then
        assertEquals(postDto.getId(), postId);
    }

    @Test
    @DisplayName("게시글 리스트 받기 테스트")
    public void getPostListTest() {
        // Given
        Long userId = 1L;
        Long cursor = 1L;

        // When
        PostListDto postListDto = postService.getPostList(userId, cursor, 1);

        // Then
        for(PostDto postDto: postListDto.getPosts()) {
            System.out.println((postDto.getId()));
        }

    }

    @Test
    @DisplayName("게시글 삭제 테스트")
    public void deletePostTest() {
        // Given
        UserDto userDto = UserDto.builder()
                .email("user@naver.com")
                .password("123").build();
        String userToken = getUserTokenForTest.getAccessToken();

        Long postId = 8L;

        // When
        postService.deletePost(userToken, postId);

        // Then
    }




}
