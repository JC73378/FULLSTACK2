package com.funkostore.backend.comingsoon.dto;

import java.math.BigDecimal;

import com.funkostore.backend.comingsoon.ComingSoonItem;

public record ComingSoonResponse(
        Long id,
        String name,
        String category,
        BigDecimal price,
        String eta,
        String imageUrl
) {
    public static ComingSoonResponse from(ComingSoonItem item) {
        return new ComingSoonResponse(
                item.getId(),
                item.getName(),
                item.getCategory(),
                item.getPrice(),
                item.getEta(),
                item.getImageUrl()
        );
    }
}
