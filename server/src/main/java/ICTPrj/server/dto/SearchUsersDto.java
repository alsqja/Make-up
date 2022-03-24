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

    public static SearchUsersDto of(User user, String filePrefix){
        return SearchUsersDto.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .profile(filePrefix + user.getProfile())
                .build();
    }
}
