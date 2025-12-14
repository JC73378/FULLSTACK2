package com.funkostore.backend.order;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.funkostore.backend.order.dto.CreateOrderRequest;
import com.funkostore.backend.order.dto.CustomerDto;
import com.funkostore.backend.order.dto.OrderItemRequest;
import com.funkostore.backend.order.dto.OrderResponse;
import com.funkostore.backend.product.Product;
import com.funkostore.backend.product.ProductRepository;

@SpringBootTest
@Transactional
class OrderServiceTest {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductRepository productRepository;

    private Product product;

    @BeforeEach
    void setup() {
        product = productRepository.findAll().stream()
                .filter(Product::isActive)
                .findFirst()
                .orElseThrow();
    }

    @Test
    void createOrderReducesStockAndCalculatesTotal() {
        int initialStock = product.getStock();
        CreateOrderRequest request = new CreateOrderRequest(
                new CustomerDto("Tester", "tester@example.com", "742 Evergreen Terrace"),
                List.of(new OrderItemRequest(product.getId(), 2)));

        OrderResponse response = orderService.createOrder(request);

        BigDecimal expectedTotal = product.getPrice().multiply(BigDecimal.valueOf(2));
        assertThat(response.total()).isEqualByComparingTo(expectedTotal);
        assertThat(response.items()).hasSize(1);

        Product updated = productRepository.findById(product.getId()).orElseThrow();
        assertThat(updated.getStock()).isEqualTo(initialStock - 2);
    }
}
