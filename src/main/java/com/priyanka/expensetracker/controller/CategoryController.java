package com.priyanka.expensetracker.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.priyanka.expensetracker.model.Category;
import com.priyanka.expensetracker.repository.CategoryRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class CategoryController {
	
		private CategoryRepository categoryRepository;

		public CategoryController(CategoryRepository categoryRepository) {
			super();
			this.categoryRepository = categoryRepository;
		}
		
		
		@GetMapping("/categories")
		Collection<Category> categories(){
			return categoryRepository.findAll();
		}
		
		//category/2
		@GetMapping("/category/{id}")
		ResponseEntity<?> getCategory(@PathVariable Long id){
			Optional<Category> category = categoryRepository.findById(id);

			return category.map(response -> ResponseEntity.ok().body(response))
				 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
		}
		
		
		
		@PostMapping("/category")
		ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) throws URISyntaxException{
		  Category result = categoryRepository.save(category);
		  return ResponseEntity.created(new URI("/api/category" + result.getId())).body(result); 
		
		}
		
		
		@PutMapping("/category/{id}")
		ResponseEntity<Category> updateCategory(@PathVariable Long id, @Valid @RequestBody Category category){
			category.setId(id);
			Category result= categoryRepository.save(category);
			return ResponseEntity.ok().body(result);
		}
		
		
		
		@DeleteMapping("/category/{id}")
		ResponseEntity<?> deleteCategory(@PathVariable Long id){
			categoryRepository.deleteById(id);
			return ResponseEntity.ok().build();
		}
}

