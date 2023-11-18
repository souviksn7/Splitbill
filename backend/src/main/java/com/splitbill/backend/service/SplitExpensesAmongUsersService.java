package com.splitbill.backend.service;

import com.splitbill.backend.model.SplitExpensesAmongUsers;

import java.util.Set;

public interface SplitExpensesAmongUsersService {
    public SplitExpensesAmongUsers findById(Long splitExpenseId);

    public Set<SplitExpensesAmongUsers> findAll();

    public SplitExpensesAmongUsers addSplitExpenses(SplitExpensesAmongUsers splitExpensesAmongUsers);
}
