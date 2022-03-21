package ICTPrj.server.dto;

import ICTPrj.server.domain.entity.User;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class SearchUsersDto {
    private Long id;
    private String nickname;
    private String profile;

    public static SearchUsersDto of(User user){
        return SearchUsersDto.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .profile(user.getProfile())
                .build();
    }
}
