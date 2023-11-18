package com.splitbill.backend.repo;

import com.splitbill.backend.model.Group;
import com.splitbill.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface GroupRepository extends JpaRepository<Group,Long> {
    Set<Group> findByUsers(User user);
}
