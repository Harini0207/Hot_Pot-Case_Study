package com.hexaware.hotbyte;

import com.hexaware.hotbyte.entity.Category;
import com.hexaware.hotbyte.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CategoryEntityTest {

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    void testCategoryGettersSetters() {
        Category category = new Category();
        category.setName("South Indian");

        assertEquals("South Indian", category.getName());
    }

    @Test
    void testCategoryRepositorySave() {
        Category category = new Category();
        category.setName("Continental");

        Category savedCategory = categoryRepository.save(category);
        Optional<Category> result = categoryRepository.findById(savedCategory.getId());

        assertTrue(result.isPresent());
        assertEquals("Continental", result.get().getName());
    }
}
