package ICTPrj.server.controller;

import ICTPrj.server.dto.TokenDto;
import ICTPrj.server.dto.TokenWithUserDto;
import ICTPrj.server.dto.UserDto;
import ICTPrj.server.dto.UserWithFollowDto;
import ICTPrj.server.service.FollowService;
import ICTPrj.server.service.SignInService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SignInController {
    private final SignInService signInService;
    private final FollowService followService;

    @PostMapping("/signin")
    public TokenWithUserDto signIn(@RequestBody UserDto userDto) {
        TokenDto accessToken = signInService.signIn(userDto);
        UserWithFollowDto userWithFollowDto = followService.signin(userDto.getEmail());
        TokenWithUserDto tokenWithUserDto = TokenWithUserDto.builder()
                .accessToken(accessToken.getAccessToken())
                .user(userWithFollowDto)
                .build();
        return tokenWithUserDto;
    }
}
