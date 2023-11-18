package com.splitbill.backend.service;

import com.splitbill.backend.model.Comment;
import com.splitbill.backend.model.Expense;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface CommentService {
    public Comment addComment(Comment tempComment);

    public Set<Comment> getComments();
    public Optional<Comment> findById(Long id);

    public void deleteComment(Long commentId);

    public Comment updateComment(Comment comment);

    Set<Comment> getAllCommentsOfAnExpense(Expense tempExpense);
}
