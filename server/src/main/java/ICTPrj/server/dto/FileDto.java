package ICTPrj.server.dto;

import lombok.*;

import java.util.ArrayList;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class FileDto {
    private ArrayList<FilePathDto> files;
}
