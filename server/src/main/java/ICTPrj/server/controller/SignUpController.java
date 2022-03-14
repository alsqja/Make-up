package ICTPrj.server.controller;

import ICTPrj.server.dto.UserDto;
import ICTPrj.server.service.SignUpService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SignUpController {
    private final SignUpService signUpService;

    @PostMapping("/signup")
    public Long SignUpUser(@RequestBody UserDto userDto) {
        return signUpService.SignUp(userDto);
    }
}
