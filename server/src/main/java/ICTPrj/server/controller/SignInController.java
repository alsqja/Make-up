package ICTPrj.server.controller;

import ICTPrj.server.dto.TokenWithUserDto;
import ICTPrj.server.dto.UserDto;
import ICTPrj.server.service.SignInService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SignInController {
    private final SignInService signInService;

    @PostMapping("/signin")
    public TokenWithUserDto signIn(@RequestBody UserDto userDto) {
        return signInService.signIn(userDto);
    }
}
