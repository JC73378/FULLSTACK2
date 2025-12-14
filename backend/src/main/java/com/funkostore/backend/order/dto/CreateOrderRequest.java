package com.funkostore.backend.order.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CreateOrderRequest(
        @NotNull @Valid CustomerDto customer,
        @NotEmpty List<@Valid OrderItemRequest> items
) {}
