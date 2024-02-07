package com.priyanka.expensetracker.repository;

import com.priyanka.expensetracker.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository  extends JpaRepository<Category, Long>{
	Category findByName(String name);
}
