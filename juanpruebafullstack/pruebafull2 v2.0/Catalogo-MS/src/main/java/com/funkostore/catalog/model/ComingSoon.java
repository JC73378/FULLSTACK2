package com.funkostore.catalog.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "coming_soon")
public class ComingSoon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private String eta;
    private BigDecimal price;
    private String img;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getEta() { return eta; }
    public void setEta(String eta) { this.eta = eta; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getImg() { return img; }
    public void setImg(String img) { this.img = img; }
}
