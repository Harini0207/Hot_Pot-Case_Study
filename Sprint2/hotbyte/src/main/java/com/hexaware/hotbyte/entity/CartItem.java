package com.hexaware.hotbyte.entity;

import jakarta.persistence.*;

@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int quantity = 1;

    @ManyToOne
    @JoinColumn(name = "user_email")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "menu_id")
    private MenuItem menuItem;

    public CartItem() {}

    public CartItem(Users user, MenuItem menuItem, int quantity) {
        this.user = user;
        this.menuItem = menuItem;
        this.quantity = quantity;
    }

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "CartItem{" +
                "id=" + id +
                ", quantity=" + quantity +
                ", user=" + user.getEmail() +
                ", menuItem=" + menuItem.getName() +
                '}';
    }
}
