package ICTPrj.server.dto;

import ICTPrj.server.domain.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserPageDto {
    private String email;
    private long count;

    public static UserPageDto of(User user){
        return UserPageDto.builder()
                .email(user.getEmail())
                .count(user.getPosts().size())
                .build();
    }
}
