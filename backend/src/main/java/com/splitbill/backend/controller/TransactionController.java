package com.splitbill.backend.controller;

import com.splitbill.backend.model.Comment;
import com.splitbill.backend.model.Transaction;
import com.splitbill.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/transaction")
@CrossOrigin("*")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    // add a transaction
    @PostMapping("/")
    public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction tempTransaction){
        return ResponseEntity.ok(transactionService.addTransaction(tempTransaction));
    }


    // get all transactions
    @GetMapping("/all")
    public ResponseEntity<?> getTransactions(){
        return ResponseEntity.ok(transactionService.getTransactions());
    }

    // get a transaction by id
    @GetMapping("/{id}")
    public Optional<Transaction> getTransaction(@PathVariable("id") Long id){
            return transactionService.findById(id);
    }

    // update a transaction
    @PutMapping("/")
    public ResponseEntity<?> updateTransaction(@RequestBody Transaction tempTransaction){
        return ResponseEntity.ok(transactionService.updateTransaction(tempTransaction));
    }

    // delete a transaction
    @DeleteMapping("/{transactionId}")
    public void deleteTransaction(@PathVariable("transactionId") Long transactionId){
         this.transactionService.deleteTransactionById(transactionId);
    }
}
