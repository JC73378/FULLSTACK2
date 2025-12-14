package com.funkostore.backend.order.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CustomerDto(
        @NotBlank String fullName,
        @Email String email,
        @NotBlank String address
) {}
