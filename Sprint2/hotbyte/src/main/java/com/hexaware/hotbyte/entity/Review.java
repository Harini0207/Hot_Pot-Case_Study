package com.hexaware.hotbyte.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int rating;

    private String comment;

    private LocalDateTime reviewDate = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "user_email")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "menu_id")
    private MenuItem menuItem;

    public Review() {}

    public Review(Users user, MenuItem menuItem, int rating, String comment) {
        this.user = user;
        this.menuItem = menuItem;
        this.rating = rating;
        this.comment = comment;
        this.reviewDate = LocalDateTime.now();
    }

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(LocalDateTime reviewDate) {
        this.reviewDate = reviewDate;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public MenuItem getMenuItem() {
        return menuItem;
    }

    public void setMenuItem(MenuItem menuItem) {
        this.menuItem = menuItem;
    }

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", rating=" + rating +
                ", comment='" + comment + '\'' +
                ", reviewDate=" + reviewDate +
                ", userEmail=" + (user != null ? user.getEmail() : null) +
                ", menuItem=" + (menuItem != null ? menuItem.getName() : null) +
                '}';
    }
}
