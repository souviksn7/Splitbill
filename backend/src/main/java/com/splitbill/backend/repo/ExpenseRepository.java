package com.splitbill.backend.repo;

import com.splitbill.backend.model.Expense;
import com.splitbill.backend.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense,Long> {
    public Set<Expense> findByGroup(Group group);
}
