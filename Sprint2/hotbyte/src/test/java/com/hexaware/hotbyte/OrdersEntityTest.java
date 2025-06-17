package com.hexaware.hotbyte;

import com.hexaware.hotbyte.entity.Orders;
import com.hexaware.hotbyte.entity.Users;
import com.hexaware.hotbyte.repository.OrdersRepository;
import com.hexaware.hotbyte.repository.UsersRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class OrdersEntityTest {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Test
    void testOrdersGettersSetters() {
        Users user = new Users("orderuser@mail.com", "pass", "Order User", "9999999999", "Order Street", "Male");
        user.setRole("user");
        usersRepository.save(user);

        Orders order = new Orders();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PLACED");

        assertEquals(user, order.getUser());
        assertEquals(500.00, order.getTotalAmount());
        assertEquals("PLACED", order.getStatus());
    }

    @Test
    void testOrdersRepositorySave() {
        Users user = new Users("saveorder@mail.com", "pass", "Save Order", "8888888888", "Save Lane", "Female");
        user.setRole("user");
        usersRepository.save(user);

        Orders order = new Orders();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("DELIVERED");

        Orders saved = ordersRepository.save(order);
        Optional<Orders> found = ordersRepository.findById(saved.getId());

        assertTrue(found.isPresent());
        assertEquals("DELIVERED", found.get().getStatus());
        assertEquals("saveorder@mail.com", found.get().getUser().getEmail());
    }
}
