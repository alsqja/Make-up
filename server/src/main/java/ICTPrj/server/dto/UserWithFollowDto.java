package ICTPrj.server.dto;

import ICTPrj.server.domain.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserWithFollowDto {
    private Long id;
    private String nickname;
    private String email;
    private String profile;
    private Long following;
    private Long follower;

    public static UserWithFollowDto of(User user, Long following, Long follower){
        return UserWithFollowDto.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .profile(user.getProfile())
                .following(following)
                .follower(follower)
                .build();
    }
}
