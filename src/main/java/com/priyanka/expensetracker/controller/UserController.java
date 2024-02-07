package com.priyanka.expensetracker.controller;


import com.priyanka.expensetracker.model.User;
import com.priyanka.expensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/account")
public class UserController {


    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    Collection<User> users(){
        return userRepository.findAll();
    }

    @PostMapping("/login")
    ResponseEntity<User> loginAccount(@Valid @RequestBody User user)  {
        User result = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());

        if(result == null) return ResponseEntity.status(404).body(result);

        return ResponseEntity.ok().body(result);
    }


    /*@PutMapping("/category/{id}")
    ResponseEntity<Category> updateCategory(@Valid @RequestBody Category category){
        Category result= categoryRepository.save(category);
        return ResponseEntity.ok().body(result);
    }



    @DeleteMapping("/category/{id}")
    ResponseEntity<?> deleteCategory(@PathVariable Long id){
        categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }*/
}