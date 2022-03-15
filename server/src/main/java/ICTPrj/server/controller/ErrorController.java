package ICTPrj.server.controller;

import ICTPrj.server.dto.ErrorDto;
import ICTPrj.server.service.ErrorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
@RequiredArgsConstructor
public class ErrorController {
    private final ErrorService errorService;

    @ExceptionHandler({ResponseStatusException.class})
    public ErrorDto ErrorHandler(ResponseStatusException e) {
        return errorService.ErrorMessageProcess(e);
    }
}
