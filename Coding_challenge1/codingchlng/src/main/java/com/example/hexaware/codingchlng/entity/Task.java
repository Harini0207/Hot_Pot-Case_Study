package com.example.hexaware.codingchlng.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is mandatory")
    private String title;

    private String description;

    @FutureOrPresent(message = "Due date must be today or future")
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Priority { LOW, MEDIUM, HIGH }
    public enum Status { PENDING, IN_PROGRESS, COMPLETED }
    
	public Task() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Task(Long id, @NotBlank(message = "Title is mandatory") String title, String description,
			@FutureOrPresent(message = "Due date must be today or future") LocalDate dueDate, Priority priority,
			Status status) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}

	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Task [id=" + id + ", title=" + title + ", description=" + description + ", dueDate=" + dueDate
				+ ", priority=" + priority + ", status=" + status + "]";
	}

   
}
