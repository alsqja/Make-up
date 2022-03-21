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
    private int count;
    private List<PostDto> posts;
}
