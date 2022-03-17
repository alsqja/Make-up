package ICTPrj.server.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FollowDto {
    private Long userId;
    private Boolean isPlus;
}
