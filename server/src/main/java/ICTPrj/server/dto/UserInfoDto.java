package ICTPrj.server.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDto {
    private UserWithFollowDto user;
    private long count;
    private List<PostDto> posts;
}
