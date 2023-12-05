package com.splitbill.backend.controller;

import com.splitbill.backend.model.Group;
import com.splitbill.backend.model.User;
import com.splitbill.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    // Get all users
    @GetMapping("/all")
    public ResponseEntity<?> getAllUser() {
        return ResponseEntity.ok(this.userService.getUsers());
    }

    // get a user by id
    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable("id") Long tempId){
        return this.userService.findById(tempId);
    }

    // add a user
    @PostMapping("/")
    public ResponseEntity<User> addUser(@RequestBody User tempUser){
        return ResponseEntity.ok(this.userService.addUser(tempUser));
    }

    // delete a user
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        this.userService.deleteUserById(userId);
    }

    // update a user
    @PutMapping("/")
    public ResponseEntity<?> updateUser(@RequestBody User tempUser){
        return ResponseEntity.ok(this.userService.updateUser(tempUser));
    }

    //  get all users of a group with groupId
    @GetMapping("/group/{groupId}")
    Set<User> getAllUsersOfAGroup(@PathVariable("groupId") Long groupId){
        Group tempGroup = new Group();
        tempGroup.setGroupId(groupId);
        return userService.getAllUsersOfAGroup(tempGroup);
    }
}
