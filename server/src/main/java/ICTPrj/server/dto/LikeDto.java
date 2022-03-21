package ICTPrj.server.dto;

import ICTPrj.server.domain.entity.Likes;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LikeDto {
    private Long id;
    private Long userId;
    private Long postId;
    private Long commentId;
    private Boolean isPlus;

    public static LikeDto of(Likes like) {
        return LikeDto.builder()
                .id(like.getId())
                .userId(like.getUser().getId())
                .postId(like.getPost() == null? null : like.getPost().getId())
                .commentId(like.getComment() == null ? null : like.getComment().getId())
                .build();
    }
}
