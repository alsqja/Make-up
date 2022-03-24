package ICTPrj.server.domain.repository;

import ICTPrj.server.domain.entity.Post;
import ICTPrj.server.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    @Query(value = "select * from User U inner join Follow F on U.id = F.following and F.follower = :followerId order by U.id desc Limit 15", nativeQuery = true)
    List<User> findFollowing(@Param("followerId") Long followerId);
    @Query(value = "select * from User U inner join Follow F on U.id = F.following and F.follower = :followerId and U.id < :cursorId order by U.id desc Limit 15", nativeQuery = true)
    List<User> findFollowingByCursor(@Param("followerId") Long followerId, @Param("cursorId") Long cursorId);

    @Query(value = "select * from User U inner join Follow F on U.id = F.follower and F.following = :followingId order by U.id desc Limit 15", nativeQuery = true)
    List<User> findFollower(@Param("followingId") Long followingId);
    @Query(value = "select * from User U inner join Follow F on U.id = F.follower and F.following = :followingId and U.id < :cursorId order by U.id desc Limit 15", nativeQuery = true)
    List<User> findFollowerByCursor(@Param("followingId") Long followingId, @Param("cursorId") Long cursorId);

    @Query(value = "select * " +
            "from User U " +
            "Left join (select F.id, F.follower, Count(F.follower) as fOder " +
            "from Follow F " +
            "Group by F.follower) FF " +
            "On FF.follower = U.id " +
            "where U.nickname like :query " +
            "order by FF.fOder desc, U.id desc " +
            "Limit 15 ", nativeQuery = true)
    List<User> findUsersByNicknameLike(@Param(value = "query")  String query);

    @Query(value = "select * " +
            "from User U " +
            "Left join (select F.id, F.follower, Count(F.follower) as fOder " +
            "from Follow F " +
            "Group by F.follower) FF " +
            "On FF.follower = U.id " +
            "where U.nickname like :query and U.id < :cursorId " +
            "order by FF.fOder desc, U.id desc " +
            "Limit 15 ", nativeQuery = true)
    List<User> findUsersByNicknameLikeCursor(@Param(value = "query")  String query, @Param("cursorId") Long cursorId);
}
