package com.splitbill.backend.controller;

import com.splitbill.backend.model.SplitExpensesAmongUsers;
import com.splitbill.backend.model.User;
import com.splitbill.backend.service.SplitExpensesAmongUsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/splitExpenses")
@CrossOrigin("*")
public class SplitExpensesAmongUsersController {
    @Autowired
    SplitExpensesAmongUsersService splitExpensesAmongUsersService;

    @GetMapping("/all")
    public Set<SplitExpensesAmongUsers> getAllSplitExpenses(){
        return splitExpensesAmongUsersService.findAll();
    }

    @PostMapping("/")
    public ResponseEntity<?> addSplitExpenses(@RequestBody SplitExpensesAmongUsers splitExpensesAmongUsers){
        return ResponseEntity.ok(splitExpensesAmongUsersService.addSplitExpenses(splitExpensesAmongUsers));
    }
}
