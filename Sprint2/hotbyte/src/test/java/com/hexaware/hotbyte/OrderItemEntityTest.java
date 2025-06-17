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
public class OrderItemEntityTest {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Test
    void testOrderItemGettersSetters() {
        // Setup User and Order
        Users user = new Users("itemuser@mail.com", "pwd", "Item User", "1111111111", "Somewhere", "Female");
        user.setRole("user");
        usersRepository.save(user);

        Orders order = new Orders();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("CONFIRMED");
       
        ordersRepository.save(order);

        // Setup Restaurant and MenuItem
        Restaurant rest = new Restaurant();
        restaurantRepository.save(rest);

        MenuItem menuItem = new MenuItem();
        menuItem.setName("Idli");
        menuItem.setDescription("Soft Idli with chutney");
        menuItem.setRestaurant(rest);
        menuItemRepository.save(menuItem);

        // Setup OrderItem
        OrderItem item = new OrderItem();
        item.setOrder(order);
        item.setMenuItem(menuItem);
        item.setQuantity(2);
       

        assertEquals(order, item.getOrder());
        assertEquals(menuItem, item.getMenuItem());
        assertEquals(2, item.getQuantity());
      
    }

    @Test
    void testOrderItemRepositorySave() {
        // Setup User and Order
        Users user = new Users("repoitem@mail.com", "1234", "Repo Item", "2222222222", "Road 2", "Male");
        user.setRole("user");
        usersRepository.save(user);

        Orders order = new Orders();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("CONFIRMED");
     
        ordersRepository.save(order);

        // Setup Restaurant and MenuItem
        Restaurant rest = new Restaurant();
        restaurantRepository.save(rest);

        MenuItem menuItem = new MenuItem();
        menuItem.setName("Fried Rice");
        menuItem.setDescription("Egg Fried Rice");
        menuItem.setRestaurant(rest);
        menuItemRepository.save(menuItem);

        // Create and Save OrderItem
        OrderItem item = new OrderItem();
        item.setOrder(order);
        item.setMenuItem(menuItem);
        item.setQuantity(2);

        OrderItem saved = orderItemRepository.save(item);
        Optional<OrderItem> found = orderItemRepository.findById(saved.getId());

        assertTrue(found.isPresent());
        assertEquals("Fried Rice", found.get().getMenuItem().getName());
        assertEquals(2, found.get().getQuantity());
    }
}
