package com.atacanyavuz.ticketing.exception;

import com.atacanyavuz.ticketing.dto.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.stream.Collectors;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    private static final String UNEXPECTED_ERROR_MESSAGE = "An unexpected error occurred";

    private ErrorResponse buildErrorResponse(HttpStatus status, String message) {
        ErrorResponse response = new ErrorResponse();
        response.setStatusCode(status.value());
        response.setMessage(message);
        return response;
    }
    private ErrorResponse buildErrorResponse(HttpStatus status, String message, String error) {
        ErrorResponse response = new ErrorResponse();
        response.setStatusCode(status.value());
        response.setMessage(message);
        response.setError(error);
        return response;
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(BadCredentialsException e) {
        log.warn("Authentication failed: {}", e.getMessage());
        ErrorResponse response = buildErrorResponse(HttpStatus.UNAUTHORIZED, "Authentication failed", e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException e) {
        String errorMessage = e.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));

        log.warn("Validation error handled: {}", errorMessage);
        ErrorResponse response = buildErrorResponse(HttpStatus.BAD_REQUEST, "Validation failed", errorMessage);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleEmailAlreadyExists(EmailAlreadyExistsException e) {
        log.warn("EmailAlreadyExists error handled", e);
        ErrorResponse response = buildErrorResponse(HttpStatus.CONFLICT, e.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(UserSaveFailedException.class)
    public ResponseEntity<ErrorResponse> handleUserSaveFailed(UserSaveFailedException e) {
        log.warn("UserSaveFailed error handled", e);
        ErrorResponse response = buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception e) {
        log.error("Unexpected error handled", e);
        ErrorResponse response = buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,UNEXPECTED_ERROR_MESSAGE, e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
