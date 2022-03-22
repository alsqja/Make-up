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
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value = "select * from Post order by id desc Limit 5", nativeQuery = true)
    List<Post> findPosts();
    @Query(value = "select * from Post where id < :cursorId order by id desc Limit 5", nativeQuery = true)
    List<Post> findPostsByCursor(@Param("cursorId") Long cursorId);
    @Query(value = "select * from Post P inner join Follow F on P.User_id = F.following and F.follower = :userId order by P.id desc Limit 5", nativeQuery = true)
    List<Post> findPostsByFollowing(@Param("userId") Long userId);
    @Query(value = "select * from Post P inner join Follow F on P.User_id = F.following and F.follower = :userId and P.id < :cursorId order by P.id desc Limit 5", nativeQuery = true)
    List<Post> findPostsByFollowingAndCursor(@Param("userId") Long userId, @Param("cursorId") Long cursorId);


    @Query(value = "select * from Post where User_id = :userId order by id desc Limit 5", nativeQuery = true)
    List<Post> findPostsById(@Param("userId") Long userId);
    @Query(value = "select * from Post where User_id = :userId and id < :cursorId order by id desc Limit 5", nativeQuery = true)
    List<Post> findPostsByCursorAndId(@Param("userId") Long userId, @Param("cursorId") Long cursorId);
}
