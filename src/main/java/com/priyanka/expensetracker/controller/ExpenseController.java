package com.priyanka.expensetracker.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.priyanka.expensetracker.model.Expense;
import com.priyanka.expensetracker.repository.ExpenseRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")

public class ExpenseController {

	@Autowired
	private ExpenseRepository expenseRepository;

	@GetMapping("/expenses")
	ResponseEntity<List<Expense>> getExpenses() {
//		System.out.println(cookie);@CookieValue("_hjSessionUser_1274764") String cookie
//		return expenseRepository.findAll();
		return ResponseEntity.ok().header("Access-Control-Allow-Credentials: true").body(expenseRepository.findAll());
	}

	@GetMapping("/expenses/user/{id}")
	ResponseEntity<List<Expense>> getExpensesByUserId(@PathVariable String id) {

		System.out.println();
		return ResponseEntity.ok().header("Access-Control-Allow-Credentials: true").body(expenseRepository.findAllByUserId(id));
	}

	@DeleteMapping("/expense/{id}")
	ResponseEntity<?> deleteExpense(@PathVariable Long id) {
		expenseRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/expenses")
	ResponseEntity<Expense> createExpense(@Valid @RequestBody Expense expense) throws URISyntaxException {
		Expense result = expenseRepository.save(expense);
		return ResponseEntity.created(new URI("/api/expenses" + result.getId())).body(result);
	}

	@PutMapping("/expense/{id}")
	ResponseEntity<Expense> updateExpense(@PathVariable Long id, @Valid @RequestBody Expense expense) throws URISyntaxException {

		expense.setId(id);
		Expense result = expenseRepository.save(expense);
		return ResponseEntity.created(new URI("/api/expense/" + result.getId())).body(result);
	}
}