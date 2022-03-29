package ICTPrj.server.dto;

import lombok.*;
import org.springframework.http.HttpStatus;

@Setter
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDto {
    private int code;
    private HttpStatus httpStatus;
    private String reason;
}
