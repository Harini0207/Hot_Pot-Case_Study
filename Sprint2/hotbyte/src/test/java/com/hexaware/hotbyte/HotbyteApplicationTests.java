package com.hexaware.hotbyte;

import com.hexaware.hotbyte.entity.Users;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class HotbyteApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void testValidEmail() {
		String email = "user@example.com";
		assertTrue(email.contains("@") && email.endsWith(".com"), "Email should be valid");
	}

	@Test
	void testInvalidEmail() {
		String email = "invalidemail";
		assertFalse(email.contains("@") && email.endsWith(".com"), "Email should be invalid");
	}

	
	@Test
	void testUserNotNullFields() {
		Users user = new Users("abc@gmail.com", "pass123", "Name", "9876543210", "City", "male");
		assertNotNull(user.getEmail(), "Email should not be null");
		assertNotNull(user.getPassword(), "Password should not be null");
		assertNotNull(user.getName(), "Name should not be null");
	}
}
