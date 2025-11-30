package com.funkostore.catalog.service;

import com.funkostore.catalog.model.ComingSoon;
import com.funkostore.catalog.model.Product;
import com.funkostore.catalog.repository.ComingSoonRepository;
import com.funkostore.catalog.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CatalogService {

    private final ProductRepository productRepository;
    private final ComingSoonRepository comingSoonRepository;

    public CatalogService(ProductRepository productRepository, ComingSoonRepository comingSoonRepository) {
        this.productRepository = productRepository;
        this.comingSoonRepository = comingSoonRepository;
    }

    public List<Product> findAllProducts() { return productRepository.findAll(); }
    public Optional<Product> findProduct(Long id) { return productRepository.findById(id); }
    public Product saveProduct(Product p) { return productRepository.save(p); }
    public void deleteProduct(Long id) { productRepository.deleteById(id); }

    public List<ComingSoon> findComingSoon() { return comingSoonRepository.findAll(); }
}
