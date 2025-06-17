package com.hexaware.hotbyte;

import com.hexaware.hotbyte.entity.*;
import com.hexaware.hotbyte.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CartItemEntityTest {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Test
    void testCartItemGettersSetters() {
        Users user = new Users("cartuser@mail.com", "pw", "Cart User", "1234567890", "Cart Address", "Other");
        user.setRole("user");
        usersRepository.save(user);

        Restaurant restaurant = new Restaurant();
        restaurantRepository.save(restaurant);

        MenuItem item = new MenuItem();
        menuItemRepository.save(item);

        CartItem cartItem = new CartItem();
        cartItem.setUser(user);
        cartItem.setMenuItem(item);
        cartItem.setQuantity(2);

        assertEquals(user, cartItem.getUser());
        assertEquals(item, cartItem.getMenuItem());
        assertEquals(2, cartItem.getQuantity());
    }

    @Test
    void testCartItemRepositorySave() {
        Users user = new Users("savecart@mail.com", "pw", "Save Cart", "1122334455", "Cart Lane", "Female");
        user.setRole("user");
        usersRepository.save(user);

        Restaurant restaurant = new Restaurant();
        restaurantRepository.save(restaurant);

        MenuItem item = new MenuItem();
        menuItemRepository.save(item);

        CartItem cartItem = new CartItem();
        cartItem.setUser(user);
        cartItem.setMenuItem(item);
        cartItem.setQuantity(3);

        CartItem saved = cartItemRepository.save(cartItem);
        Optional<CartItem> found = cartItemRepository.findById(saved.getId());

        assertTrue(found.isPresent());
        assertEquals(3, found.get().getQuantity());
        assertEquals(item.getName(), found.get().getMenuItem().getName());
    }
}
