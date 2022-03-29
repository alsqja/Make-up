package ICTPrj.server.service;

import ICTPrj.server.dto.ErrorDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class ErrorService {

    public ResponseEntity<ErrorDto> ErrorMessageProcess(ResponseStatusException e) {
        ErrorDto errorDto = ErrorDto.builder()
                                    .code(e.getRawStatusCode())
                                    .reason(e.getReason())
                                    .httpStatus(e.getStatus())
                                    .build();


        return new ResponseEntity<>(errorDto, errorDto.getHttpStatus());
    }
}
