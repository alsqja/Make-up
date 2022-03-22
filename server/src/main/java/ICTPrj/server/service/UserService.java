package ICTPrj.server.service;

import ICTPrj.server.domain.entity.User;
import ICTPrj.server.domain.repository.UserRepository;
import ICTPrj.server.dto.*;
import ICTPrj.server.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;

    private User getUser(String userToken) {
        String userToken_ = userToken.substring(7);
        String userEmail = tokenProvider.getUserEmailFromToken(userToken_);
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 사용자입니다."));
        return user;
    }

    public IdDto updateUser(String accessToken, EditUserDto editUserDto){
        User user = getUser(accessToken);
        if(!user.getPassword().equals(editUserDto.getOldPassword())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "잘못된 비밀번호 입니다.");
        }

        user.setPassword(editUserDto.getNewPassword());
        user.setProfile(editUserDto.getProfile());
        user.setNickname(editUserDto.getNickname());
        userRepository.save(user);

        return IdDto.builder()
                .id(user.getId())
                .build();
    }

    public void deleteUser(String accessToken){
        User user = getUser(accessToken);
        userRepository.delete(user);
    }

    public UserPageDto getUserInfoById(Long id){
        return UserPageDto.of(userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 사용자입니다.")));
    }
}
