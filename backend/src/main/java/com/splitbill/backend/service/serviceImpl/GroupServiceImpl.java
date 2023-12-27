package com.splitbill.backend.service.serviceImpl;

import com.splitbill.backend.model.Group;
import com.splitbill.backend.model.User;
import com.splitbill.backend.repo.GroupRepository;
import com.splitbill.backend.repo.UserRepository;
import com.splitbill.backend.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class GroupServiceImpl implements GroupService {
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public Group addGroup(Group tempGroup) {
        return groupRepository.save(tempGroup);
    }

    @Override
    public Optional<Group> findById(Long id) {
        return groupRepository.findById(id);
    }

    @Override
    public Set<Group> getGroups() {
        return new LinkedHashSet<>(groupRepository.findAll());
    }

    public void deleteGroup(Long tempId){
        groupRepository.deleteById(tempId);
    }

    @Override
    public Group updateGroup(Group tempGroup) {
        return groupRepository.save(tempGroup);
    }

    @Override
    public Set<Group> getAllGroupsOfAUser(User tempUser) {
        return groupRepository.findByUsers(tempUser);
    }

    @Override
    public Group assignUserToGroup(Long groupId, Long userId) {
        Set<User> userSet = null;
        Group group = groupRepository.findById(groupId).get();
        User user = userRepository.findById(userId).get();
        userSet = group.getUsers();
        userSet.add(user);
        group.setUsers(userSet);
        return groupRepository.save(group);
    }


    @Override
    public Set<User> removeUserFromGroup(Long groupId, Long userId) {
        Set<User> userSet = null;
        Group group = groupRepository.findById(groupId).get();
        User user = userRepository.findById(userId).get();
        userSet = group.getUsers();
        userSet.remove(user);
        group.setUsers(userSet);
        groupRepository.save(group);
        return userRepository.findByGroups(group);
    }



}
