package com.priyanka.expensetracker.model;

import java.time.Instant;
import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
@Table(name="expense")
public class Expense {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	private int amount;
	private String description;
	private Instant expensedate;

	
	@ManyToOne
	private Category category;
	
//	@JsonIgnore
	@ManyToOne
	private User user;

}
