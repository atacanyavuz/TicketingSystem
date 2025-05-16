package com.atacanyavuz.ticketing.service;

import com.atacanyavuz.ticketing.dto.request.LoginRequest;
import com.atacanyavuz.ticketing.dto.request.RegisterRequest;
import com.atacanyavuz.ticketing.dto.response.LoginResponse;
import com.atacanyavuz.ticketing.dto.response.RegisterResponse;
import com.atacanyavuz.ticketing.entity.User;
import com.atacanyavuz.ticketing.exception.EmailAlreadyExistsException;
import com.atacanyavuz.ticketing.exception.UserSaveFailedException;
import com.atacanyavuz.ticketing.mapper.UserMapper;
import com.atacanyavuz.ticketing.repository.UserRepository;
import com.atacanyavuz.ticketing.security.JWTUtils;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtils jwtUtils;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JWTUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public RegisterResponse register(RegisterRequest request) {
        User user = UserMapper.registerRequestToUser(request);

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            log.warn("User registration failed: Email {} already in use", user.getEmail());
            throw new EmailAlreadyExistsException("Email is already in use.");
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        User userRes = userRepository.save(user);

        if (userRes.getId() == null) {
            log.error("User could not be saved. Due to: User Response ID is null");
            throw new UserSaveFailedException("User could not be saved.");
        }

        log.info("New user registered: {}", user.getEmail());

        RegisterResponse response = new RegisterResponse();
        response.setMessage("User Saved Successfully");
        response.setStatusCode(HttpStatus.OK.value());

        return response;
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    log.warn("Login failed: Email {} not found", request.getEmail());
                    return new BadCredentialsException("Invalid email or password");
                });

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            log.warn("Login failed: Password mismatch for email {}", request.getEmail());
            throw new BadCredentialsException("Invalid email or password");
        }

        log.info("User logged in successfully: {}", user.getEmail());

        String accessToken = jwtUtils.generateAccessToken(user);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .message("Login Successful")
                .statusCode(HttpStatus.OK.value())
                .build();
    }
}
