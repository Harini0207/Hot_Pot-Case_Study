package com.hexaware.hotbyte;

import com.hexaware.hotbyte.entity.Restaurant;
import com.hexaware.hotbyte.repository.RestaurantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

@SpringBootTest
public class RestaurantEntityTest {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Test
    void testRestaurantGettersSetters() {
        Restaurant restaurant = new Restaurant();

        assertEquals("KFC", restaurant.getrestaurantName());
        assertEquals("Main Street", restaurant.getAddress());
        assertEquals("9876543210", restaurant.getContactNumber());
        assertEquals("kfc@mail.com", restaurant.getEmail());
        assertEquals("kfc.jpg", restaurant.getImageUrl());
    }

    @Test
    void testRestaurantRepository() {
        Restaurant restaurant = new Restaurant();
        restaurantRepository.save(restaurant);
        Optional<Restaurant> result = restaurantRepository.findById(restaurant.getId());
        assertTrue(result.isPresent());
        assertEquals("Dominos", result.get().getrestaurantName());
    }
}
