package com.hexaware.hotbyte.repository;

import com.hexaware.hotbyte.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, String> {
}
