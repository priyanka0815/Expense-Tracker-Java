package com.priyanka.expensetracker.repository;

import com.priyanka.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense,Long> {
    List<Expense> findAllByUserId(String id);
}
