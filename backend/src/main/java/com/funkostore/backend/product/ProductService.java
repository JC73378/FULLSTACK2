package com.funkostore.backend.product;

import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.funkostore.backend.common.NotFoundException;
import com.funkostore.backend.product.dto.ProductRequest;
import com.funkostore.backend.product.dto.ProductResponse;

@Service
@Transactional
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> listProducts(boolean includeInactive, Boolean onSale, String category) {
        return repository.findAll().stream()
                .filter(p -> includeInactive || p.isActive())
                .filter(p -> onSale == null || p.isOnSale() == onSale)
                .filter(p -> category == null
                        || p.getCategory().equalsIgnoreCase(category)
                        || p.getCategory().toLowerCase(Locale.ROOT).contains(category.toLowerCase(Locale.ROOT)))
                .map(ProductResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProductResponse getById(Long id) {
        return repository.findById(id)
                .map(ProductResponse::from)
                .orElseThrow(() -> new NotFoundException("Producto no encontrado"));
    }

    public ProductResponse create(ProductRequest request) {
        Product product = new Product();
        apply(request, product);
        return ProductResponse.from(repository.save(product));
    }

    public ProductResponse update(Long id, ProductRequest request) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Producto no encontrado"));
        apply(request, product);
        return ProductResponse.from(repository.save(product));
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Producto no encontrado");
        }
        repository.deleteById(id);
    }

    private void apply(ProductRequest request, Product product) {
        product.setName(request.name());
        product.setPrice(request.price());
        product.setCategory(request.category());
        product.setImageUrl(request.imageUrl());
        product.setStock(request.stock());
        product.setOnSale(Boolean.TRUE.equals(request.onSale()));
        product.setActive(request.active() == null || request.active());
    }
}
