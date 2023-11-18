package com.splitbill.backend.repo;

import com.splitbill.backend.model.Group;
import com.splitbill.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    public  User findByName(String name);

    public Set<User> findByGroups(Group group);
}
