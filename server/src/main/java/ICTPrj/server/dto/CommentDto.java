package ICTPrj.server.dto;

import ICTPrj.server.domain.entity.Comment;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private Long id;
    private String content;
    private Long postId;
    private Long userId;

    public static CommentDto of(Comment comment) {
        return CommentDto.builder()
                .id(comment.getId())
                .userId(comment.getUser().getId())
                .postId(comment.getPost().getId())
                .content(comment.getContent())
                .build();
    }
}
