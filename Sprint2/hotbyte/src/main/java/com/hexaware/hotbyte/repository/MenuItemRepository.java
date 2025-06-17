package com.hexaware.hotbyte.repository;

import com.hexaware.hotbyte.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuItemRepository extends JpaRepository<MenuItem, Integer> {
}
