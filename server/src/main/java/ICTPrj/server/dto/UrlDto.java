package ICTPrj.server.dto;

import lombok.*;

import java.util.ArrayList;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UrlDto {
    private ArrayList<FilePathDto> urls;
}
