package com.splitbill.backend.service.serviceImpl;

import com.splitbill.backend.model.Expense;
import com.splitbill.backend.model.SplitExpensesAmongUsers;
import com.splitbill.backend.repo.SplitExpensesAmongUsersRepository;
import com.splitbill.backend.service.SplitExpensesAmongUsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class SplitExpensesAmongUsersServiceImpl implements SplitExpensesAmongUsersService {

    @Autowired
    private SplitExpensesAmongUsersRepository splitExpensesAmongUsersRepository;

    @Override
    public SplitExpensesAmongUsers findById(Long splitExpenseId) {
        return splitExpensesAmongUsersRepository.findById(splitExpenseId).get();
    }

    @Override
    public Set<SplitExpensesAmongUsers> findAll() {
        return new LinkedHashSet<>(splitExpensesAmongUsersRepository.findAll());
    }

    @Override
    public void deleteSplitExpenseById(Long splitExpenseId) {
        splitExpensesAmongUsersRepository.deleteById(splitExpenseId);
    }

    @Override
    public SplitExpensesAmongUsers addSplitExpenses(SplitExpensesAmongUsers splitExpensesAmongUsers) {
        return splitExpensesAmongUsersRepository.save(splitExpensesAmongUsers);
    }

    @Override
    public Set<SplitExpensesAmongUsers> getSplitExpensesByExpense(Expense tempExpense) {
        return splitExpensesAmongUsersRepository.findByExpense(tempExpense);
    }
}
