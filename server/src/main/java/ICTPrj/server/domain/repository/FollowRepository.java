package ICTPrj.server.domain.repository;

import ICTPrj.server.domain.entity.Follow;
import ICTPrj.server.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Long countByFollowing(User user);
    Long countByFollower(User user);
    void deleteByFollowingAndFollower(User following, User follower);
    boolean existsByFollowerAndFollowing(User follower, User following);
}
