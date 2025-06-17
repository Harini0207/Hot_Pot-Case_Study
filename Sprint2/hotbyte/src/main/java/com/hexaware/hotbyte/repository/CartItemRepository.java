package com.hexaware.hotbyte.repository;

import com.hexaware.hotbyte.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
}
