package ICTPrj.server.dto;

import ICTPrj.server.domain.entity.User;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String nickname;
    private String password;
    private String email;
    private String profile;

    public static UserDto of(User user, String filePrefix){
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .password(user.getPassword())
                .profile(filePrefix + user.getProfile())
                .build();
    }
}
