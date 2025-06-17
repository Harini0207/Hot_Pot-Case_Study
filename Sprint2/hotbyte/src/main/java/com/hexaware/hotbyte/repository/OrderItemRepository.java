package com.hexaware.hotbyte.repository;

import com.hexaware.hotbyte.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
}
