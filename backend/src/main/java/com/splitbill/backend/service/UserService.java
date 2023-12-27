package com.splitbill.backend.service;

import com.splitbill.backend.model.Group;
import com.splitbill.backend.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

public interface UserService {

   public Optional<User> findById(Long id);

   public Set<User> getUsers();

   public User addUser(User user) throws Exception;

   public void deleteUserById(Long id);

   public User updateUser(User user);

   public Set<User> getAllUsersOfAGroup(Group group);

   ResponseEntity<String> forgetPassword(Map<String, String> requestMap);

   ResponseEntity<String> updatePassword(Map<String, String> requestMap);

}
