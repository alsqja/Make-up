package ICTPrj.server.dto;

import ICTPrj.server.domain.entity.Comment;
import ICTPrj.server.domain.entity.Likes;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private Long id;
    private String content;
    private DefaultUserDto user;
    private List<LikeDto> likes;

    public static CommentDto of(Comment comment, String filePrefix) {

        List<LikeDto> likeList = new ArrayList<>();
        for(Likes like : comment.getLikes()){
            likeList.add(LikeDto.of(like));
        }

        return CommentDto.builder()
                .id(comment.getId())
                .user(DefaultUserDto.of(comment.getUser(),filePrefix))
                .content(comment.getContent())
                .likes(likeList)
                .build();
    }
}
