package com.splitbill.backend.controller;

import com.splitbill.backend.model.Expense;
import com.splitbill.backend.model.Group;
import com.splitbill.backend.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/expense")
@CrossOrigin("*")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    // add an expense
    @PostMapping("/")
    public ResponseEntity<Expense> addExpense(@RequestBody Expense tempExpense){
        return ResponseEntity.ok(this.expenseService.addExpense(tempExpense));
    }

    // get all expenses
    @GetMapping("/all")
    public ResponseEntity<?> getExpenses(){
        return ResponseEntity.ok(this.expenseService.getExpenses());
    }

    // get expense by id
    @GetMapping("/{id}")
    public Optional<Expense> findById(@PathVariable("id") Long id){
        return expenseService.findById(id);
    }

    // delete an expense
    @DeleteMapping("/{expenseId}")
    public void deleteExpense(@PathVariable("expenseId") Long expenseId){
        expenseService.deleteExpense(expenseId);
    }

    // update an expense
    @PutMapping("/")
    public ResponseEntity<?> updateExpense(@RequestBody Expense tempExpense){
        return ResponseEntity.ok(expenseService.updateExpense(tempExpense));
    }

    @GetMapping("/group/{groupId}")
    public Set<Expense> getAllExpensesOfAGroup(@PathVariable("groupId") Long groupId){
        Group tempGroup = new Group();
        tempGroup.setGroupId(groupId);
        return expenseService.getAllExpensesOfAGroup(tempGroup);
    }
}
