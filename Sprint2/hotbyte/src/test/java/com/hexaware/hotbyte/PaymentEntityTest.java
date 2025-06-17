package com.hexaware.hotbyte;

import com.hexaware.hotbyte.entity.*;
import com.hexaware.hotbyte.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class PaymentEntityTest {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Test
    void testPaymentGettersSetters() {
        Users user = new Users("payuser@mail.com", "pw", "Pay User", "1234567890", "Some Area", "Other");
        user.setRole("user");
        usersRepository.save(user);

        Orders order = new Orders();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("DELIVERED");
        ordersRepository.save(order);

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setPaymentDate(LocalDateTime.now());
        payment.setMethod("Credit Card");
        payment.setStatus("SUCCESS");

        assertEquals(order, payment.getOrder());
        assertEquals(999.99, payment.getAmount());
        assertEquals("Credit Card", payment.getMethod());
        assertEquals("SUCCESS", payment.getStatus());
    }

    @Test
    void testPaymentRepositorySave() {
        Users user = new Users("paymentcheck@mail.com", "check", "Payment Check", "9990001111", "Area X", "Male");
        user.setRole("user");
        usersRepository.save(user);

        Orders order = new Orders();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PAID");
        ordersRepository.save(order);

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setPaymentDate(LocalDateTime.now());
        payment.setMethod("UPI");
        payment.setStatus("SUCCESS");

        Payment saved = paymentRepository.save(payment);
        Optional<Payment> found = paymentRepository.findById(saved.getId());

        assertTrue(found.isPresent());
        assertEquals("UPI", found.get().getMethod());
        assertEquals(1500.0, found.get().getAmount());
        assertEquals("SUCCESS", found.get().getStatus());
    }
}
