package ICTPrj.server.service;

import ICTPrj.server.domain.entity.User;
import ICTPrj.server.domain.repository.UserRepository;
import ICTPrj.server.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Transactional
public class SignUpService {
    private final UserRepository userRepository;

    @Value("${cloud.aws.s3.fileprefix}")
    private String filePrefix;

    public UserDto SignUp(UserDto userDto) {
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "이미 가입되어 있는 유저입니다");
        }
        
        User user = User.builder()
                .nickname(userDto.getNickname())
                .password(userDto.getPassword())
                .email(userDto.getEmail())
                .profile(userDto.getProfile())
                .build();

        return UserDto.of(userRepository.save(user),filePrefix);
    }
}
