package com.example.hexaware.codingchlng.repository;

import com.example.hexaware.codingchlng.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
