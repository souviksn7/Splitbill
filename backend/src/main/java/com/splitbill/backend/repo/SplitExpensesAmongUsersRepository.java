package com.splitbill.backend.repo;

import com.splitbill.backend.model.Comment;
import com.splitbill.backend.model.Expense;
import com.splitbill.backend.model.SplitExpensesAmongUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface SplitExpensesAmongUsersRepository extends JpaRepository<SplitExpensesAmongUsers, Long> {
    Set<SplitExpensesAmongUsers> findByExpense(Expense expense);
}
