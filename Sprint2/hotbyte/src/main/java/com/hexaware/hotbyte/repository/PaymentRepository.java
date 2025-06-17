package com.hexaware.hotbyte.repository;

import com.hexaware.hotbyte.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
