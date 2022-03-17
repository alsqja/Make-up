package ICTPrj.server.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EditUserDto {
    private String nickname;
    private String profile;
    private String oldPassword;
    private String newPassword;
}
