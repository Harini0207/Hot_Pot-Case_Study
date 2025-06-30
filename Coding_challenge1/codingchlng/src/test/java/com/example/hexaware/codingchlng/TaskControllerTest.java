package com.example.hexaware.codingchlng;

import com.example.hexaware.codingchlng.entity.Task;
import com.example.hexaware.codingchlng.entity.Task.Priority;
import com.example.hexaware.codingchlng.entity.Task.Status;
import com.example.hexaware.codingchlng.repository.TaskRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Base64;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Task savedTask;

    private String authHeader;

    @BeforeEach
    void setup() {
        
        taskRepository.deleteAll();
        savedTask = new Task(null, "Sample Task", "Desc",
                LocalDate.now().plusDays(1), Priority.HIGH, Status.PENDING);
        savedTask = taskRepository.save(savedTask);

        
        authHeader = "Basic " + Base64.getEncoder().encodeToString("user:1234".getBytes());
    }

    @Test
    void testGetAllTasks() throws Exception {
        mockMvc.perform(get("/api/tasks")
                .header(HttpHeaders.AUTHORIZATION, authHeader))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Sample Task"));
    }

    @Test
    void testGetTaskById() throws Exception {
        mockMvc.perform(get("/api/tasks/" + savedTask.getId())
                .header(HttpHeaders.AUTHORIZATION, authHeader))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(savedTask.getId()))
                .andExpect(jsonPath("$.title").value("Sample Task"));
    }

    @Test
    void testAddTask() throws Exception {
        Task newTask = new Task(null, "New Task", "New Desc",
                LocalDate.now().plusDays(5), Priority.MEDIUM, Status.IN_PROGRESS);

        mockMvc.perform(post("/api/tasks")
                .header(HttpHeaders.AUTHORIZATION, authHeader)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newTask)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("New Task"));
    }

    @Test
    void testUpdateTask() throws Exception {
        savedTask.setTitle("Updated Task");
        savedTask.setStatus(Status.COMPLETED);

        mockMvc.perform(put("/api/tasks/" + savedTask.getId())
                .header(HttpHeaders.AUTHORIZATION, authHeader)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(savedTask)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Task"))
                .andExpect(jsonPath("$.status").value("COMPLETED"));
    }

    @Test
    void testDeleteTask() throws Exception {
        mockMvc.perform(delete("/api/tasks/" + savedTask.getId())
                .header(HttpHeaders.AUTHORIZATION, authHeader))
                .andExpect(status().isNoContent());
    }
}
