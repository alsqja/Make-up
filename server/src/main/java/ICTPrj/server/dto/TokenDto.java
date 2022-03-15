package ICTPrj.server.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDto {
    private String grantType;
    private String accessToken;
    private Long accessTokenExpiresIn;
}
