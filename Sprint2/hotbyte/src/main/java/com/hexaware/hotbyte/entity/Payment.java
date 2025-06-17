package com.hexaware.hotbyte.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDateTime paymentDate = LocalDateTime.now();

    private BigDecimal amount;

    private String method;

    private String status = "Pending";

    @OneToOne
    @JoinColumn(name = "order_id")
    private Orders order;

    public Payment() {}

    public Payment(Orders order, BigDecimal amount, String method, String status) {
        this.order = order;
        this.amount = amount;
        this.method = method;
        this.status = status;
        this.paymentDate = LocalDateTime.now();
    }

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Orders getOrder() {
        return order;
    }

    public void setOrder(Orders order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return "Payment{" +
                "id=" + id +
                ", paymentDate=" + paymentDate +
                ", amount=" + amount +
                ", method='" + method + '\'' +
                ", status='" + status + '\'' +
                ", orderId=" + (order != null ? order.getId() : null) +
                '}';
    }
}
