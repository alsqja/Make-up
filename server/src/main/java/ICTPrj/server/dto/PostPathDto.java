package ICTPrj.server.dto;


import ICTPrj.server.domain.entity.File;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostPathDto {
    private String content;
    private Long userId;
    private ArrayList<FilePathDto> files;
}
