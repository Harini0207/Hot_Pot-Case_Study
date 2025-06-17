package com.hexaware.hotbyte.repository;

import com.hexaware.hotbyte.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
}
