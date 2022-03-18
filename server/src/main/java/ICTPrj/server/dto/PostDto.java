package ICTPrj.server.dto;

import ICTPrj.server.domain.entity.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private Long id;
    private String content;
    private Long userId;

    private List<File> files;
    private List<Comment> comments;
    private List<Likes> likes;

    public static PostDto of(Post post){
        return PostDto.builder()
                .id(post.getId())
                .content(post.getContent())
                .userId(post.getUser().getId())
                .files(post.getFiles())
                .comments(post.getComments())
                .likes(post.getLikes())
                .build();
    }
}
