package ICTPrj.server.service;

import ICTPrj.server.domain.entity.Comment;
import ICTPrj.server.domain.entity.Likes;
import ICTPrj.server.domain.entity.Post;
import ICTPrj.server.domain.entity.User;
import ICTPrj.server.domain.repository.CommentRepository;
import ICTPrj.server.domain.repository.LikeRepository;
import ICTPrj.server.domain.repository.PostRepository;
import ICTPrj.server.domain.repository.UserRepository;
import ICTPrj.server.dto.LikeDto;
import ICTPrj.server.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Transactional
public class LikeService {
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final LikeRepository likeRepository;
    private final CommentRepository commentRepository;

    private User getUser(String userToken) {
        String userToken_ = userToken.substring(7);
        String userEmail = tokenProvider.getUserEmailFromToken(userToken_);
        User user = userRepository
                .findByEmail(userEmail).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "없는 사용자 입니다."));

        return user;
    }

    public void likePostOrComment(String userToken, LikeDto likeDto) {
        // 유저가 있는지
        User user = getUser(userToken);

        // {post or comment}
        if(likeDto.getPostId() != null) {
            // {post or comment} 가 있는지
            Post post = postRepository.findById(likeDto.getPostId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "없는 게시글 입니다."));

            // isPlus 가 True 면 테이블에서 삭제
            if(likeDto.getIsPlus()) {
                // 그러면 like 를 "{post or comment}, {userId}" 를 키로 찾을 수 있다.
                Likes like = likeRepository.findByPostIdAndUserId(post.getId(), user.getId())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unauthorized"));

                likeRepository.delete(like);
            }

            // isPlus 가 False 면 테이블에 추가
            else {
                Likes like = Likes.builder()
                        .post(post)
                        .user(user)
                        .comment(null)
                        .build();

                likeRepository.save(like);
            }
        }

        else {
            Comment comment = commentRepository.findById(likeDto.getCommentId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "없는 댓글 입니다."));


            if(likeDto.getIsPlus()) {
                Likes like = likeRepository.findByCommentIdAndUserId(comment.getId(), user.getId())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unauthorized"));
                likeRepository.delete(like);
            }

            else {
                Likes like = Likes.builder()
                        .post(null)
                        .user(user)
                        .comment(comment)
                        .build();
                likeRepository.save(like);
            }
        }
    }
}
