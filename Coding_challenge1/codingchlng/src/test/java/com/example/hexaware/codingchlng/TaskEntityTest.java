package com.example.hexaware.codingchlng;

import com.example.hexaware.codingchlng.entity.Task;
import com.example.hexaware.codingchlng.entity.Task.Priority;
import com.example.hexaware.codingchlng.entity.Task.Status;
import com.example.hexaware.codingchlng.repository.TaskRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TaskEntityTest {

    @Autowired
    private TaskRepository taskRepository;

    @Test
    void testTaskGettersSetters() {
        Task task = new Task();
        task.setTitle("Test Task");
        task.setDescription("This is a test task");
        task.setDueDate(LocalDate.of(2025, 7, 1));
        task.setPriority(Priority.HIGH);
        task.setStatus(Status.PENDING);

        assertEquals("Test Task", task.getTitle());
        assertEquals("This is a test task", task.getDescription());
        assertEquals(LocalDate.of(2025, 7, 1), task.getDueDate());
        assertEquals(Priority.HIGH, task.getPriority());
        assertEquals(Status.PENDING, task.getStatus());
    }

    @Test
    void testTaskRepositorySaveAndFind() {
        Task task = new Task();
        task.setTitle("Repository Test Task");
        task.setDescription("Testing save and find");
        task.setDueDate(LocalDate.of(2025, 8, 15));
        task.setPriority(Priority.MEDIUM);
        task.setStatus(Status.IN_PROGRESS);

        Task saved = taskRepository.save(task);
        Optional<Task> result = taskRepository.findById(saved.getId());

        assertTrue(result.isPresent());
        assertEquals("Repository Test Task", result.get().getTitle());
        assertEquals(Status.IN_PROGRESS, result.get().getStatus());
    }
}
