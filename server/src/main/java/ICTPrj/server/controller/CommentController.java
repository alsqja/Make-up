package ICTPrj.server.controller;

import ICTPrj.server.dto.CommentDto;
import ICTPrj.server.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/post/{id}/comment")
    public Long writeComment(@RequestHeader(value = "Authorization") String userToken,
                             @PathVariable(value = "id") Long postId,
                             @RequestBody CommentDto commentDto) {
        return commentService.writeComment(userToken, postId, commentDto);
    }

    @PutMapping("/post/{postId}/comment/{commentId}")
    public Long modifyComment(@RequestHeader(value = "Authorization") String userToken,
                              @PathVariable(value = "postId") Long postId,
                              @PathVariable(value = "commentId") Long commentId,
                              @RequestBody CommentDto commentDto
    ) {
        return commentService.modifyComment(userToken, postId, commentId, commentDto);
    }

    @DeleteMapping("/post/{postId}/comment/{commentId}")
    public void deleteComment(@RequestHeader(value = "Authorization") String userToken,
                              @PathVariable(value = "postId") Long postId,
                              @PathVariable(value = "commentId") Long commentId) {

        commentService.deleteComment(userToken, postId, commentId);
        throw new ResponseStatusException(HttpStatus.NO_CONTENT, "댓글 삭제 성공");
    }
}
