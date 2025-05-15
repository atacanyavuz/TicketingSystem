package com.atacanyavuz.ticketing.exception;

public class UserSaveFailedException extends RuntimeException {
    public UserSaveFailedException(String message) {
        super(message);
    }
}