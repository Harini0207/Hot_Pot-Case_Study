package com.hexaware.hotbyte;

import com.hexaware.hotbyte.entity.Users;
import com.hexaware.hotbyte.repository.UsersRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UsersEntityTest {

    @Autowired
    private UsersRepository usersRepository;

    @Test
    void testUsersGettersSetters() {
        Users user = new Users("test@mail.com", "pass123", "Test User", "9876543210", "Test Address", "Male");
        user.setRole("admin");

        assertEquals("test@mail.com", user.getEmail());
        assertEquals("pass123", user.getPassword());
        assertEquals("Test User", user.getName());
        assertEquals("9876543210", user.getPhone());
        assertEquals("Test Address", user.getAddress());
        assertEquals("Male", user.getGender());
        assertEquals("admin", user.getRole());
    }

    @Test
    void testUsersRepository() {
        Users user = new Users("repo@mail.com", "secure", "Repo User", "1234567890", "Repo Address", "Female");
        usersRepository.save(user);
        Optional<Users> result = usersRepository.findById("repo@mail.com");
        assertTrue(result.isPresent());
        assertEquals("Repo User", result.get().getName());
    }
}
