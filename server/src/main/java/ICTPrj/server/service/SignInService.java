package ICTPrj.server.service;

import ICTPrj.server.domain.entity.User;
import ICTPrj.server.domain.repository.FollowRepository;
import ICTPrj.server.domain.repository.UserRepository;
import ICTPrj.server.dto.TokenDto;
import ICTPrj.server.dto.TokenWithUserDto;
import ICTPrj.server.dto.UserDto;
import ICTPrj.server.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class SignInService {
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;

    public TokenDto signIn(UserDto userDto) {
        User user = userRepository.findByEmail(userDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("없는 사용자입니다."));

        userDto.setId(user.getId());
        if(!userDto.getPassword().equals(user.getPassword())){
            throw new IllegalArgumentException("비밀번호를 확인하세요.");
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDto.getEmail(), "", null);
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
        return tokenDto;
    }
}
