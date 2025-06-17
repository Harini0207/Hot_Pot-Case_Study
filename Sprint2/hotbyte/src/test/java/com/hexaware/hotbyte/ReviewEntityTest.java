package com.hexaware.hotbyte;

import com.hexaware.hotbyte.entity.Review;
import com.hexaware.hotbyte.repository.ReviewRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ReviewEntityTest {

    @Autowired
    private ReviewRepository reviewRepository;

    @Test
    void testReviewGettersSetters() {
        Review review = new Review();
        review.setRating(4);
        review.setComment("Delicious food and quick delivery!");

        assertEquals(4, review.getRating());
        assertEquals("Delicious food and quick delivery!", review.getComment());
    }

    @Test
    void testReviewRepositorySave() {
        Review review = new Review();
        review.setRating(5);
        review.setComment("Excellent service!");

        Review saved = reviewRepository.save(review);
        Optional<Review> result = reviewRepository.findById(saved.getId());

        assertTrue(result.isPresent());
        assertEquals("Excellent service!", result.get().getComment());
    }
}
