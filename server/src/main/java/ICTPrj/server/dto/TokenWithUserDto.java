package ICTPrj.server.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenWithUserDto {
    private String accessToken;
    private UserWithFollowDto user;
}
