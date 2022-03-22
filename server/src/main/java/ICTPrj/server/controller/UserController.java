package ICTPrj.server.controller;

import ICTPrj.server.dto.*;
import ICTPrj.server.service.FollowService;
import ICTPrj.server.service.PostService;
import ICTPrj.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final PostService postService;
    private final FollowService followService;

    @PutMapping("/user/me")
    public IdDto editUser(@RequestHeader(value = "Authorization") String accessToken, @RequestBody EditUserDto editUserDto){
        return userService.updateUser(accessToken, editUserDto);
    }

    @DeleteMapping("/user/me")
    public ResponseEntity deleteUser(@RequestHeader(value = "Authorization") String accessToken){
        userService.deleteUser(accessToken);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/user")
    public UserInfoDto getUserInfo(@RequestParam(value = "id") Long userId, @RequestParam(value = "cursor") Long cursor) {
        UserPageDto userInfo = userService.getUserInfoById(userId);
        UserWithFollowDto userWithFollowDto = followService.signin(userInfo.getEmail());
        List<PostDto> postList = postService.getPostList(userId, cursor, 0).getPosts();
        long postsLength = userInfo.getCount();
        return UserInfoDto.builder()
                .user(userWithFollowDto)
                .count(postsLength)
                .posts(postList)
                .build();
    }
}
