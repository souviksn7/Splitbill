package com.splitbill.backend.service;

import com.splitbill.backend.model.Transaction;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface TransactionService {
    public Transaction addTransaction(Transaction transaction);

    public Set<Transaction> getTransactions();

    public Optional<Transaction> findById(Long id);

    public Transaction updateTransaction(Transaction tempTransaction);
    public void deleteTransactionById(Long transactionId);
}
