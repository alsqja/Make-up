package ICTPrj.server.domain.repository;

import ICTPrj.server.domain.entity.Likes;
import ICTPrj.server.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findByPostIdAndUserId(Long postId, Long userId);
    Optional<Likes> findByCommentIdAndUserId(Long commentId, Long userId);
}
