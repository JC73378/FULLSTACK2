package com.funkostore.backend.order.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import com.funkostore.backend.order.CustomerOrder;
import com.funkostore.backend.order.OrderStatus;

public record OrderResponse(
        Long id,
        OrderStatus status,
        BigDecimal total,
        Instant createdAt,
        CustomerDto customer,
        List<OrderItemResponse> items
) {
    public static OrderResponse from(CustomerOrder order) {
        CustomerDto customer = new CustomerDto(order.getCustomerName(), order.getCustomerEmail(), order.getCustomerAddress());
        List<OrderItemResponse> itemResponses = order.getItems().stream().map(OrderItemResponse::from).toList();
        return new OrderResponse(order.getId(), order.getStatus(), order.getTotal(), order.getCreatedAt(), customer, itemResponses);
    }
}
