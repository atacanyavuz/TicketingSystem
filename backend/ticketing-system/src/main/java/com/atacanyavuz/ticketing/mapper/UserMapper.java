package com.atacanyavuz.ticketing.mapper;

import com.atacanyavuz.ticketing.dto.request.RegisterRequest;
import com.atacanyavuz.ticketing.entity.User;

public class UserMapper {
    public static User registerRequestToUser(RegisterRequest request) {
        return User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword())
                .role(request.getRole())
                .build();
    }
}
