package ICTPrj.server.controller;

import ICTPrj.server.dto.CommentDto;
import ICTPrj.server.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/post/{id}/comment")
    public CommentDto writeComment(@RequestHeader(value="Authorization") String userToken,
                             @PathVariable(value = "id") Long postId,
                             @RequestBody CommentDto commentDto) {
        System.out.println("userToken = " + userToken + ", postId = " + postId + ", commentDto = " + commentDto);
        return commentService.writeComment(userToken, postId, commentDto);
    }

}
