package ICTPrj.server.dto;

import ICTPrj.server.domain.entity.User;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DefaultUserDto {
    private Long id;
    private String nickname;
    private String profile;

    public static DefaultUserDto of(User user){
        return DefaultUserDto.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .profile(user.getProfile())
                .build();
    }
}
