package ICTPrj.server.controller;

import ICTPrj.server.dto.EditUserDto;
import ICTPrj.server.dto.IdDto;
import ICTPrj.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PutMapping("/user/me")
    public IdDto editUser(@RequestHeader(value = "Authorization") String accessToken, @RequestBody EditUserDto editUserDto){
        return userService.updateUser(accessToken, editUserDto);
    }

    @DeleteMapping("/user/me")
    public ResponseEntity deleteUser(@RequestHeader(value = "Authorization") String accessToken){
        userService.deleteUser(accessToken);
        return new ResponseEntity(HttpStatus.OK);
    }
}
