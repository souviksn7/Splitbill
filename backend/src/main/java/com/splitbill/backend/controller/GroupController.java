package com.splitbill.backend.controller;

import com.splitbill.backend.model.Group;
import com.splitbill.backend.model.User;
import com.splitbill.backend.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/group")
@CrossOrigin("*")
public class GroupController {
    @Autowired
    private GroupService groupService;

    // add a group
    @PostMapping("/")
    public ResponseEntity<Group> addGroup(@RequestBody Group group){
        return ResponseEntity.ok(this.groupService.addGroup(group));
    }

    // get a group by id
    @GetMapping("/{id}")
    public Optional<Group> getGroupById(@PathVariable("id") Long id )
    {
        return groupService.findById(id);
    }

    // get all groups
    @GetMapping("/all")
    public ResponseEntity<?> getGroups(){
        return ResponseEntity.ok(groupService.getGroups());
    }

    // delete a group
    @DeleteMapping("/{groupId}")
    public void deleteGroup(@PathVariable("groupId") Long groupId){
        groupService.deleteGroup(groupId);
    }

    // update a group
    @PutMapping("/")
    public ResponseEntity<?> updateGroup(@RequestBody Group tempGroup){
        return ResponseEntity.ok(groupService.updateGroup(tempGroup));
    }

    @PutMapping("/{groupId}/user/{userId}")
    public Group assignUserToGroup(@PathVariable Long groupId, @PathVariable Long userId){
        return groupService.assignUserToGroup(groupId, userId);
    }

    // get all groups of a user using groupId
    @GetMapping("/user/{userId}")
    public Set<Group> getAllGroupsOfAUser(@PathVariable("userId") Long tempUserId){
        User user = new User();
        user.setUserId(tempUserId);
        return this.groupService.getAllGroupsOfAUser(user);
    }
}
