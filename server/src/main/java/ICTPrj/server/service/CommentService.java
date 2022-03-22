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
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final PostRepository postRepository;


    private User getUser(String userToken) {
        String userToken_ = userToken.substring(7);
        String userEmail = tokenProvider.getUserEmailFromToken(userToken_);
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "없는 사용자 입니다."));
        return user;
    }

    public Long writeComment(String userToken, Long postId, CommentDto commentDto) {
        User user = getUser(userToken);

        Post post = postRepository.findById(postId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "없는 게시글 입니다."));

        Comment comment = Comment.builder()
                                 .user(user)
                                 .post(post)
                                 .content(commentDto.getContent())
                                 .build();
        return commentRepository.save(comment).getId();
    }

    public Long modifyComment(String userToken, Long postId, Long commentId, CommentDto commentDto) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "없는 댓글 입니다."));
        User user = getUser(userToken);
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "없는 게시글 입니다."));

        if(!comment.getPost().getId().equals(postId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 게시글입니다.");
        }

        if(!comment.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unauthorized");
        }

        comment = Comment.builder()
                .id(commentId)
                .user(user)
                .post(post)
                .content(commentDto.getContent())
                .build();

        return commentRepository.save(comment).getId();
    }

    public Long deleteComment(String userToken, Long postId, Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "없는 댓글 입니다."));
        User user = getUser(userToken);
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "없는 댓글 입니다."));;

        if(!comment.getPost().getId().equals(postId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 댓글입니다.");
        }

        if(!comment.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unauthorized");
        }

        commentRepository.delete(comment);

        return commentId;
    }
}
