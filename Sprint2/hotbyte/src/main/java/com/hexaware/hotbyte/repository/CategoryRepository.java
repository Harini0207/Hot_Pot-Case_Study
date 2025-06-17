package com.hexaware.hotbyte.repository;

import com.hexaware.hotbyte.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
