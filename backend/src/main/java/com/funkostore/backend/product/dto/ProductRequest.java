package com.funkostore.backend.product.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProductRequest(
        @NotBlank @Size(max = 120) String name,
        @NotNull @Min(0) BigDecimal price,
        @NotBlank @Size(max = 80) String category,
        @NotBlank String imageUrl,
        @NotNull @Min(0) Integer stock,
        Boolean onSale,
        Boolean active
) {}
