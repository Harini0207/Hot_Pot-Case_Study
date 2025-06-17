package com.hexaware.hotbyte.repository;

import com.hexaware.hotbyte.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {
}
