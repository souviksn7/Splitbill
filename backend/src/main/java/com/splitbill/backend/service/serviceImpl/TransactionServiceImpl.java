package com.splitbill.backend.service.serviceImpl;

import com.splitbill.backend.model.Transaction;
import com.splitbill.backend.repo.TransactionRepository;
import com.splitbill.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class TransactionServiceImpl implements TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;
    @Override
    public Transaction addTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public Set<Transaction> getTransactions() {
        return new LinkedHashSet<>(transactionRepository.findAll()) ;
    }

    @Override
    public Optional<Transaction> findById(Long id) {
        return transactionRepository.findById(id);
    }

    @Override
    public Transaction updateTransaction(Transaction tempTransaction) {
        return transactionRepository.save(tempTransaction);
    }
    @Override
    public void deleteTransactionById(Long transactionId) {
        transactionRepository.deleteById(transactionId);
    }


}
