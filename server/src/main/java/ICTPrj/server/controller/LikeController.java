package ICTPrj.server.controller;

import ICTPrj.server.dto.LikeDto;
import ICTPrj.server.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @PostMapping("/likes")
    public void likePostOrComment(
            @RequestHeader(value = "Authorization") String userToken,
            @RequestBody LikeDto likeDto) {

        likeService.likePostOrComment(userToken, likeDto);

        if(likeDto.getIsPlus()) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "좋아요 취소 성공");
        }

        else {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "좋아요 성공");
        }
    }
}
