package com.funkostore.orders.repository;

import com.funkostore.orders.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> { }
