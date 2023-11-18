package com.splitbill.backend.service.serviceImpl;

import com.splitbill.backend.model.Group;
import com.splitbill.backend.model.User;
import com.splitbill.backend.repo.UserRepository;
import com.splitbill.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Set<User> getUsers() {
        return new LinkedHashSet<>(userRepository.findAll());
    }

    @Override
    public User addUser(User tempUser) {
        return userRepository.save(tempUser);
    }

    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Set<User> getAllUsersOfAGroup(Group group) {
        return userRepository.findByGroups(group);
    }
}
