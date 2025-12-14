package com.funkostore.backend.order.dto;

import java.math.BigDecimal;

import com.funkostore.backend.order.OrderItem;

public record OrderItemResponse(
        Long productId,
        String productName,
        int quantity,
        BigDecimal unitPrice
) {
    public static OrderItemResponse from(OrderItem item) {
        return new OrderItemResponse(item.getProductId(), item.getProductName(), item.getQuantity(), item.getUnitPrice());
    }
}
