package com.splitbill.backend.repo;

import com.splitbill.backend.model.SplitExpensesAmongUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SplitExpensesAmongUsersRepository extends JpaRepository<SplitExpensesAmongUsers, Long> {
}
