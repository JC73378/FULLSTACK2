package com.funkostore.backend.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.funkostore.backend.auth.dto.AuthResponse;
import com.funkostore.backend.auth.dto.LoginRequest;
import com.funkostore.backend.auth.dto.RegisterRequest;
import com.funkostore.backend.common.BadRequestException;
import com.funkostore.backend.common.NotFoundException;

@Service
@Transactional
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (repository.existsByEmailIgnoreCase(request.email())) {
            throw new BadRequestException("El email ya existe");
        }
        UserAccount user = new UserAccount();
        user.setName(request.name());
        user.setEmail(request.email().toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        UserAccount saved = repository.save(user);
        return new AuthResponse(saved.getId(), saved.getName(), saved.getEmail(), jwtService.generate(saved));
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        UserAccount user = repository.findByEmailIgnoreCase(request.email())
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));
        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BadRequestException("Credenciales invalidas");
        }
        return new AuthResponse(user.getId(), user.getName(), user.getEmail(), jwtService.generate(user));
    }
}
