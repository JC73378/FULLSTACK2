package com.funkostore.auth.controller;

import com.funkostore.auth.model.Role;
import com.funkostore.auth.model.User;
import com.funkostore.auth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        User user = authService.register(request.email(), request.password(), request.role());
        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "role", user.getRole()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        return authService.login(request.email(), request.password())
                .<ResponseEntity<?>>map(tokens -> ResponseEntity.ok(Map.of(
                        "accessToken", tokens.accessToken(),
                        "refreshToken", tokens.refreshToken())))
                .orElseGet(() -> ResponseEntity.status(401).body(Map.of("error", "Credenciales invalidas")));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshRequest request) {
        return authService.refresh(request.refreshToken())
                .<ResponseEntity<?>>map(tokens -> ResponseEntity.ok(Map.of(
                        "accessToken", tokens.accessToken(),
                        "refreshToken", tokens.refreshToken())))
                .orElseGet(() -> ResponseEntity.status(401).body(Map.of("error", "Token no valido")));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Principal principal) {
        if (principal == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(Map.of("email", principal.getName()));
    }

    public record AuthRequest(String email, String password) {}
    public record RegisterRequest(String email, String password, Role role) {}
    public record RefreshRequest(String refreshToken) {}
}
