package com.splitbill.backend.repo;

import com.splitbill.backend.model.Comment;
import com.splitbill.backend.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Set<Comment> findByExpense(Expense expense);
}
