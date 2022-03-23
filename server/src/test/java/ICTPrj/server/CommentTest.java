package ICTPrj.server;

import ICTPrj.server.controller.SignInController;
import ICTPrj.server.dto.CommentDto;
import ICTPrj.server.dto.TokenDto;
import ICTPrj.server.dto.UserDto;
import ICTPrj.server.service.CommentService;
import ICTPrj.server.service.SignInService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional
public class CommentTest {
    @Autowired
    private CommentService commentService;

    @Autowired
    private SignInService signInService;

    private String getAccessToken() {
        UserDto userDto = UserDto.builder()
                .email("user@naver.com")
                .password("123").build();

        TokenDto accessToken = signInService.signIn(userDto);
        return "7777777" + accessToken.getAccessToken();
    }

    @Test
    @DisplayName("댓글 작성 테스트")
    public void writeCommentTest() {
        // Given
        String userToken = getAccessToken();
        Long postId = 8L;
        CommentDto commentDto = CommentDto.builder()
                .content("test")
                .build();

        // When
        Long commentId = commentService.writeComment(userToken, postId, commentDto);

        // Then
    }


    @Test
    @DisplayName("댓글 수정 테스트")
    public void commentModifyTest() {
        // Given
        String userToken = getAccessToken();
        Long postId = 1L;
        Long commentId = 5L;
        CommentDto commentDto = CommentDto.builder()
                .content("modify")
                .build();

        // When
        Long modifiedCommentId = commentService.modifyComment(userToken, postId, commentId, commentDto);

        // Then
        assertEquals(modifiedCommentId, commentId);
    }


    @Test
    @DisplayName("댓글 삭제 테스트")
    public void deleteCommentTest() {
        String userToken = getAccessToken();
        Long postId = 1L;
        Long commentId = 5L;

        commentService.deleteComment(userToken, postId, commentId);
    }
}
