package ICTPrj.server.service;

import ICTPrj.server.dto.ErrorDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class ErrorService {

    public ErrorDto ErrorMessagePorcess(ResponseStatusException e) {
        ErrorDto errorDto = ErrorDto.builder()
                                    .code(e.getRawStatusCode())
                                    .reason(e.getReason())
                                    .httpStatus(e.getStatus())
                                    .build();

        return errorDto;
    }

}
