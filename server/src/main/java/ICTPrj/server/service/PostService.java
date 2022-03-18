package ICTPrj.server.service;

import ICTPrj.server.domain.entity.Post;
import ICTPrj.server.domain.entity.User;
import ICTPrj.server.domain.repository.PostRepository;
import ICTPrj.server.domain.repository.UserRepository;
import ICTPrj.server.dto.PostDto;
import ICTPrj.server.dto.UserDto;
import ICTPrj.server.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@RequiredArgsConstructor
@Service
@Transactional
public class PostService {
    private final PostRepository postRepository;
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;


    private String getUserEmail(String userToken) {
        String userToken_ = userToken.substring(7);
        String userEmail = tokenProvider.getUserEmailFromToken(userToken_);
        return userEmail;
    }

    public Long writePost(String userToken, PostDto postDto) {
        // 유저가 {회원 or 비회원}?
        String userEmail = getUserEmail(userToken);
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unauthorized"));

        Post post = Post.builder()
                .content(postDto.getContent())
                .user(user)
                .files(postDto.getFiles())
                .build();

        return PostDto.of(postRepository.save(post)).getId();
    }
}



