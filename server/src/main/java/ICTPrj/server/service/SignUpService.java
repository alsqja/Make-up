package ICTPrj.server.service;


import ICTPrj.server.domain.entity.User;
import ICTPrj.server.domain.repository.UserRepository;
import ICTPrj.server.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class SignUpService {
    private final UserRepository userRepository;

    //  회원가입
    public Long SignUp(UserDto userDto) {
        User user = User.builder()
                .nickname(userDto.getNickname())
                .password(userDto.getPassword())
                .email(userDto.getEmail())
                .profile(userDto.getProfile())
                .build();

        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This user is already exist");
//            return 409L;
//            throw new IllegalStateException("이미 존재하는 회원 입니다.");
        }

        else {
            userRepository.save(user);

            // res : id
            Optional<User> newUser = userRepository.findByEmail(user.getEmail());
            Long savedId = newUser.get().getId();
            return savedId;
        }
    }
}
