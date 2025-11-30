package com.funkostore.auth.service;

import com.funkostore.auth.model.Role;
import com.funkostore.auth.model.User;
import com.funkostore.auth.repository.UserRepository;
import com.funkostore.auth.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Transactional
    public User register(String email, String password, Role role) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email ya registrado");
        }
        User user = new User();
        user.setEmail(email.toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setRole(role == null ? Role.CUSTOMER : role);
        return userRepository.save(user);
    }

    public Optional<AuthTokens> login(String email, String password) {
        return userRepository.findByEmail(email.toLowerCase())
                .filter(u -> passwordEncoder.matches(password, u.getPasswordHash()))
                .map(this::generateTokens);
    }

    public Optional<AuthTokens> refresh(String refreshToken) {
        String email = jwtUtil.extractEmail(refreshToken);
        return userRepository.findByEmail(email)
                .filter(u -> jwtUtil.isTokenValid(refreshToken, email))
                .map(this::generateTokens);
    }

    private AuthTokens generateTokens(User user) {
        return new AuthTokens(jwtUtil.generateAccessToken(user), jwtUtil.generateRefreshToken(user));
    }

    public record AuthTokens(String accessToken, String refreshToken) {}
}
