package com.funkostore.backend.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.funkostore.backend.auth.dto.AuthResponse;
import com.funkostore.backend.auth.dto.LoginRequest;
import com.funkostore.backend.auth.dto.RegisterRequest;
import com.funkostore.backend.common.BadRequestException;

@SpringBootTest
@Transactional
class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Test
    void registerAndLoginRoundTrip() {
        String email = "unique" + System.currentTimeMillis() + "@test.com";
        RegisterRequest register = new RegisterRequest("Test User", email, "secret123");
        AuthResponse registered = authService.register(register);
        assertThat(registered.userId()).isNotNull();

        AuthResponse logged = authService.login(new LoginRequest(email, "secret123"));
        assertThat(logged.userId()).isEqualTo(registered.userId());
    }

    @Test
    void duplicateEmailThrowsBadRequest() {
        String email = "duplicate@test.com";
        authService.register(new RegisterRequest("Tester", email, "secret123"));

        assertThatThrownBy(() -> authService.register(new RegisterRequest("Other", email, "secret123")))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("email");
    }
}
