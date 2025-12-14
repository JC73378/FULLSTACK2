package com.funkostore.backend.product.dto;

import java.math.BigDecimal;

import com.funkostore.backend.product.Product;

public record ProductResponse(
        Long id,
        String name,
        String category,
        BigDecimal price,
        String imageUrl,
        boolean onSale,
        boolean active,
        int stock
) {
    public static ProductResponse from(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getCategory(),
                product.getPrice(),
                product.getImageUrl(),
                product.isOnSale(),
                product.isActive(),
                product.getStock()
        );
    }
}
