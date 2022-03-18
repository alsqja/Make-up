package ICTPrj.server.controller;


import ICTPrj.server.dto.PostDto;
import ICTPrj.server.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping("/post")
    public Long writePost(@RequestHeader(value = "Authorization") String userToken,
                          @RequestBody PostDto postDto) {
        return postService.writePost(userToken, postDto);
    }





}
