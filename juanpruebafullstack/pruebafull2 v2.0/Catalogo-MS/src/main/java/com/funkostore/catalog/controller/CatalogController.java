package com.funkostore.catalog.controller;

import com.funkostore.catalog.model.Product;
import com.funkostore.catalog.model.ComingSoon;
import com.funkostore.catalog.service.CatalogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/catalog")
public class CatalogController {

    private final CatalogService catalogService;

    public CatalogController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping("/products")
    public List<Product> allProducts() { return catalogService.findAllProducts(); }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> productById(@PathVariable Long id) {
        return catalogService.findProduct(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product saved = catalogService.saveProduct(product);
        return ResponseEntity.created(URI.create("/api/v1/catalog/products/" + saved.getId())).body(saved);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return catalogService.findProduct(id)
                .map(existing -> {
                    product.setId(existing.getId());
                    return ResponseEntity.ok(catalogService.saveProduct(product));
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        catalogService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/coming-soon")
    public List<ComingSoon> comingSoon() { return catalogService.findComingSoon(); }
}
