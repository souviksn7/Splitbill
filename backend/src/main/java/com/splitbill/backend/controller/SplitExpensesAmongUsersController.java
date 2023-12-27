package com.splitbill.backend.controller;

import com.splitbill.backend.model.Expense;
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

    @GetMapping("/{splitExpenseId}")
    public SplitExpensesAmongUsers getSplitExpenseById(@PathVariable("splitExpenseId") Long splitExpenseId){
        return splitExpensesAmongUsersService.findById(splitExpenseId);
    }

    // add split expenses
    @PostMapping("/")
    public ResponseEntity<?> addSplitExpenses(@RequestBody SplitExpensesAmongUsers splitExpensesAmongUsers){
        return ResponseEntity.ok(splitExpensesAmongUsersService.addSplitExpenses(splitExpensesAmongUsers));
    }

    // Remove split expense with expenseId
    @DeleteMapping("/{splitExpenseId}")
    public void removeSplitExpenseById(@PathVariable("splitExpenseId") Long splitExpenseId){
        splitExpensesAmongUsersService.deleteSplitExpenseById(splitExpenseId);
    }

    // get split expenses by expenseId
    @GetMapping("/expense/{expenseId}")
    public Set<SplitExpensesAmongUsers> getSplitExpensesByExpenseId(@PathVariable("expenseId") Long expenseId){
        Expense tempExpense = new Expense();
        tempExpense.setExpenseId(expenseId);
        return splitExpensesAmongUsersService.getSplitExpensesByExpense(tempExpense);
    }

    // update split expenses
    @PutMapping("/")
    public ResponseEntity<?> updateSplitExpenses(@RequestBody SplitExpensesAmongUsers splitExpensesAmongUsers){
        return ResponseEntity.ok(splitExpensesAmongUsersService.updateSplitExpenses(splitExpensesAmongUsers));
    }
}