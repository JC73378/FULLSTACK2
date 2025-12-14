package com.funkostore.backend.auth.dto;

public record AuthResponse(Long userId, String name, String email, String token) {
}
