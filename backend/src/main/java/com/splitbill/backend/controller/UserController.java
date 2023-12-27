package com.splitbill.backend.controller;

import com.splitbill.backend.model.Group;
import com.splitbill.backend.model.User;
import com.splitbill.backend.repo.UserRepository;
import com.splitbill.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

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
    public ResponseEntity<User> addUser(@RequestBody User tempUser) throws Exception{
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

    //get the current user

    @GetMapping("/current-user")
    public  User getLoggedInUser(Principal principal){
        return ((User)this.userDetailsService.loadUserByUsername(principal.getName()));
    }

    //change are made for OTP generation through email

    @PostMapping(path = "/forgotPassword")
    public ResponseEntity<String> forgetPassword(@RequestBody Map<String, String> requestMap){
        try {
//            return userService.forgetPassword(requestMap);
            User user = userRepository.findByEmail(requestMap.get("email"));
            if (user != null) {
                ResponseEntity<String> response = userService.forgetPassword(requestMap);
                return response;
            } else {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ResponseEntity<>("SOMETHING_WENT_WRONG", HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @PostMapping(path = "/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody Map<String, String> requestMap){
        try {
            return userService.updatePassword(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ResponseEntity<>("SOMETHING_WENT_WRONG", HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
