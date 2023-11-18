package com.splitbill.backend.service.serviceImpl;

import com.splitbill.backend.model.Comment;
import com.splitbill.backend.model.Expense;
import com.splitbill.backend.repo.CommentRepository;
import com.splitbill.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Override
    public Comment addComment(Comment tempComment) {
        return commentRepository.save(tempComment);
    }

    @Override
    public Set<Comment> getComments() {
        return new LinkedHashSet<>(commentRepository.findAll());
    }

    @Override
    public Optional<Comment> findById(Long id) {
        return commentRepository.findById(id);
    }

    @Override
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    @Override
    public Comment updateComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public Set<Comment> getAllCommentsOfAnExpense(Expense tempExpense) {
        return commentRepository.findByExpense(tempExpense);
    }

}
