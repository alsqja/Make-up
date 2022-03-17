package ICTPrj.server.controller;

import ICTPrj.server.domain.entity.User;
import ICTPrj.server.dto.FollowDto;
import ICTPrj.server.dto.FollowUserDto;
import ICTPrj.server.dto.IdDto;
import ICTPrj.server.dto.UserDto;
import ICTPrj.server.jwt.TokenProvider;
import ICTPrj.server.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;
    private final TokenProvider tokenProvider;

    @PostMapping("/follow")
    public IdDto doFollow(@RequestHeader("Authorization") String accessToken, @RequestBody FollowDto followDto){
        String userEmail = tokenProvider.getUserEmailFromToken(accessToken.substring(7));
        return followService.doFollow(userEmail, followDto);
    }

    @GetMapping("/following")
    public FollowUserDto getFollowingList(@RequestParam("id") Long id, @RequestParam("cursor") Long cursor){
        return followService.getFollowList(id, cursor, 1);
    }

    @GetMapping("/follower")
    public FollowUserDto getFollowerList(@RequestParam("id") Long id, @RequestParam("cursor") Long cursor){
        return followService.getFollowList(id, cursor, 0);
    }
}
