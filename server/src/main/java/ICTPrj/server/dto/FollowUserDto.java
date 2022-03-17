package ICTPrj.server.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FollowUserDto {
    private List<DefaultUserDto> user;
}
