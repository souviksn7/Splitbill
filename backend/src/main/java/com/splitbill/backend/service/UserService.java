package com.splitbill.backend.service;

import com.splitbill.backend.model.Group;
import com.splitbill.backend.model.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserService {

   public Optional<User> findById(Long id);

   public Set<User> getUsers();

   public User addUser(User user);

   public void deleteUserById(Long id);

   public User updateUser(User user);

   public Set<User> getAllUsersOfAGroup(Group group);

}
