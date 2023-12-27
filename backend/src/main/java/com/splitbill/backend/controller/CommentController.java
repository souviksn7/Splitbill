package com.splitbill.backend.controller;

import com.splitbill.backend.model.Comment;
import com.splitbill.backend.model.Expense;
import com.splitbill.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/comment")
@CrossOrigin("*")
public class CommentController {
    @Autowired
    private CommentService commentService;

    // add a comment
    @PostMapping("/")
    public ResponseEntity<Comment> addComment(@RequestBody Comment tempComment){
        return ResponseEntity.ok(commentService.addComment(tempComment));
    }

    // get all comments
    @GetMapping("/all")
    public ResponseEntity<?> getUsers(){
        return ResponseEntity.ok(this.commentService.getComments());
    }

    // get comment by id
    @GetMapping("/{id}")
    public Optional<Comment> findById(@PathVariable("id") Long id){
        return commentService.findById(id);
    }

    // delete comment by id
    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable("commentId") Long commentId){
        commentService.deleteComment(commentId);
    }

    // update comment
    @PutMapping("/")
    public ResponseEntity<?> updateComment(@RequestBody Comment tempComment){
        return ResponseEntity.ok(this.commentService.updateComment(tempComment));
    }

    @GetMapping("/expense/{expenseId}")
    public Set<Comment> getAllCommentsOfAnExpense(@PathVariable("expenseId") Long expenseId){
        Expense tempExpense = new Expense();
        tempExpense.setExpenseId(expenseId);
        return commentService.getAllCommentsOfAnExpense(tempExpense);
    }
}
