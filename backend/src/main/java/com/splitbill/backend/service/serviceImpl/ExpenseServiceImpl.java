package com.splitbill.backend.service.serviceImpl;

import com.splitbill.backend.model.Comment;
import com.splitbill.backend.model.Expense;
import com.splitbill.backend.model.Group;
import com.splitbill.backend.repo.ExpenseRepository;
import com.splitbill.backend.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.LinkedHashSet;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;
    @Override
    public Expense addExpense(Expense tempExpense) {
        return expenseRepository.save(tempExpense);
    }

    @Override
    public Set<Expense> getExpenses() {

        return new LinkedHashSet<>(expenseRepository.findAll());
    }

    @Override
    public Optional<Expense> findById(Long id) {
        return expenseRepository.findById(id);
    }

    @Override
    public void deleteExpense(Long expenseId) {
        expenseRepository.deleteById(expenseId);
    }

    public Expense updateExpense(Expense tempExpense){
        return expenseRepository.save(tempExpense);
    }

    @Override
    public Set<Expense> getAllExpensesOfAGroup(Group tempGroup) {
       return expenseRepository.findByGroup(tempGroup);
    }
}
