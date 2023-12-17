package com.splitbill.backend.service;

import com.splitbill.backend.model.Expense;
import com.splitbill.backend.model.SplitExpensesAmongUsers;

import java.util.Set;

public interface SplitExpensesAmongUsersService {
    public SplitExpensesAmongUsers findById(Long splitExpenseId);

    public Set<SplitExpensesAmongUsers> findAll();

    public void deleteSplitExpenseById(Long splitExpenseId);

    public SplitExpensesAmongUsers addSplitExpenses(SplitExpensesAmongUsers splitExpensesAmongUsers);

    public Set<SplitExpensesAmongUsers> getSplitExpensesByExpense(Expense tempExpense);

    public SplitExpensesAmongUsers updateSplitExpenses(SplitExpensesAmongUsers splitExpensesAmongUsers);
}
