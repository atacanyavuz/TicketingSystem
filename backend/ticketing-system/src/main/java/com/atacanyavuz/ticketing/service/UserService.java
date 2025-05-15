package com.atacanyavuz.ticketing.service;

import com.atacanyavuz.ticketing.common.constants.StatusCodes;
import com.atacanyavuz.ticketing.dto.request.RegisterRequest;
import com.atacanyavuz.ticketing.dto.response.RegisterResponse;
import com.atacanyavuz.ticketing.entity.User;
import com.atacanyavuz.ticketing.mapper.UserMapper;
import com.atacanyavuz.ticketing.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public RegisterResponse register(RegisterRequest request) {
        RegisterResponse response = new RegisterResponse();
        User user = userMapper.registerRequestToUser(request);

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            log.warn("User registration failed: Email {} already in use", user.getEmail());
            throw new IllegalArgumentException("Email is already in use.");
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        User userRes = userRepository.save(user);

        if (userRes.getId() == null) {
            log.error("User could not be saved. Due to: User Response ID is null");
            throw new RuntimeException("User could not be saved.");
        }

        log.info("New user registered: {}", user.getEmail());
        response.setMessage("User Saved Successfully");
        response.setStatusCode(StatusCodes.OK);

        return response;
    }
}
