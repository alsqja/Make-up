package ICTPrj.server.service;

import ICTPrj.server.domain.entity.Comment;
import ICTPrj.server.domain.entity.Post;
import ICTPrj.server.domain.entity.User;
import ICTPrj.server.domain.repository.CommentRepository;
import ICTPrj.server.domain.repository.PostRepository;
import ICTPrj.server.domain.repository.UserRepository;
import ICTPrj.server.dto.CommentDto;
import ICTPrj.server.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public Long writeComment(String userToken, Long postId, CommentDto commentDto) {
        String userToken_ = userToken.substring(7);
        String userEmail = tokenProvider.getUserEmailFromToken(userToken_);
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalArgumentException("없는 사용자입니다."));

        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("없는 게시글 입니다."));

        Comment comment = Comment.builder()
                                 .user(user)
                                 .post(post)
                                 .content(commentDto.getContent())
                                 .build();

        System.out.println("userToken = " + user.getEmail() + ", postId = " + post.getContent() + ", commentDto = " + comment.getContent() + ", " + comment.getPost().getContent());

        return CommentDto.of(commentRepository.save(comment)).getId();
    }



}
