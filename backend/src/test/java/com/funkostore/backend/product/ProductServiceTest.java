package com.funkostore.backend.product;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.funkostore.backend.product.dto.ProductResponse;

@SpringBootTest
@Transactional
class ProductServiceTest {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @Test
    void listProductsHonorsIncludeInactiveFlag() {
        Product inactive = new Product();
        inactive.setName("Test Inactivo");
        inactive.setCategory("Test");
        inactive.setPrice(new BigDecimal("10.00"));
        inactive.setImageUrl("http://example.com/test.png");
        inactive.setStock(5);
        inactive.setOnSale(false);
        inactive.setActive(false);
        Product saved = productRepository.save(inactive);

        List<ProductResponse> activeOnly = productService.listProducts(false, null, null);
        assertThat(activeOnly).noneMatch(p -> p.id().equals(saved.getId()));

        List<ProductResponse> withInactive = productService.listProducts(true, null, null);
        assertThat(withInactive).anyMatch(p -> p.id().equals(saved.getId()));
    }
}
