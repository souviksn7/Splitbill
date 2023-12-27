package com.splitbill.backend.service.serviceImpl;

import com.splitbill.backend.model.User;
import com.splitbill.backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = this.userRepository.findByEmail(email);

        if(user==null)
        {
            System.out.println("User not found");
            throw  new UsernameNotFoundException("No user found with this username");
        }

        return user;
    }
}
