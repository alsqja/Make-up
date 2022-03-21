package ICTPrj.server.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostListDto {
    List<PostDto> posts;
}
