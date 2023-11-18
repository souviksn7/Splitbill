package com.splitbill.backend.service;

import com.splitbill.backend.model.Group;
import com.splitbill.backend.model.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface GroupService {
    public Group addGroup(Group tempGroup);

    public Optional<Group> findById(Long id);

    public Set<Group> getGroups();

    public void deleteGroup(Long id);

    public Group updateGroup(Group tempGroup);

    public Set<Group> getAllGroupsOfAUser(User tempUser);

    public Group assignUserToGroup(Long groupId, Long userId);
}
