package com.hexaware.hotbyte.repository;

import com.hexaware.hotbyte.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
