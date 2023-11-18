package com.splitbill.backend.service;

import com.splitbill.backend.model.Expense;
import com.splitbill.backend.model.Group;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface ExpenseService {
    public Expense addExpense(Expense expense);

    public Set<Expense> getExpenses();

    public Optional<Expense> findById(Long id);

    public void deleteExpense(Long expenseId);

    public Expense updateExpense(Expense expense);

    Set<Expense> getAllExpensesOfAGroup(Group tempGroup);
}
