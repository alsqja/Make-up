package ICTPrj.server.dto;

import ICTPrj.server.domain.entity.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String email;
    private String nickname;
    private String password;
    private String profile;

    public static UserDto of(User user){
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .password(user.getPassword())
                .profile(user.getProfile())
                .build();
    }
}
