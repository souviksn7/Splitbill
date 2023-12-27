package com.splitbill.backend.service.serviceImpl;

import com.splitbill.backend.model.Group;
import com.splitbill.backend.model.User;
import com.splitbill.backend.repo.UserRepository;
import com.splitbill.backend.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Set<User> getUsers() {
        return new LinkedHashSet<>(userRepository.findAll());
    }

    @Override
    public User addUser(User tempUser) throws Exception{
        String password = "123";
        User local = this.userRepository.findByEmail(tempUser.getEmail());
        if(local!=null)
        {
            System.out.println("User already Exsist");
            throw new Exception("User already Exsist");
        }else {
           // tempUser.setUserId(UUID.randomUUID());
            tempUser.setPassword(passwordEncoder.encode(password));
            local = this.userRepository.save(tempUser);
        }

        return local;
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

    @Autowired
    public JavaMailSender emailSender;

    //implementing the OTP send module for forgot password

    @Override
    public ResponseEntity<String> forgetPassword(Map<String, String> requestMap) {
        System.out.println("inside the forgot password function");
        try {
            User user = userRepository.findByEmail(requestMap.get("email"));
            System.out.println("user email is : " + user.getEmail());
            if (!Objects.isNull(user)) {
                System.out.println("11");
                this.forgetMail(user.getEmail() , "OTP by Splitbills" , requestMap.get("otp"));
                return new ResponseEntity<>("Check Your mail for Credentials", HttpStatus.OK);
            }


        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ResponseEntity<>("SOMETHING_WENT_WRONG", HttpStatus.INTERNAL_SERVER_ERROR);
    }




    public void  forgetMail(String to , String subject, String otp) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("souviknandi235@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);
        String htmlMSG = "<p><b>Hello Thank you For receiving the Email </b></p><p><b>Your Login details for Split Bills</b></p><b>Email:</b>"+ to + "<br><b>OTP: </b>" + otp + "<br><a href=\"http://localhost:4200/\">Click here to login</a></p>";
        message.setContent(htmlMSG , "text/html");
        emailSender.send(message);
    }


    //update password
    @Override
    public ResponseEntity<String> updatePassword(Map<String, String> requestMap) {
        try {
            User user = userRepository.findByEmail(requestMap.get("email"));
            if (!user.equals(null)) {

                user.setPassword(passwordEncoder.encode(requestMap.get("password")));
                userRepository.save(user);
                return new ResponseEntity<>("Password Updated Successfully", HttpStatus.OK);


            }
            return new ResponseEntity<>("SOMETHING_WENT_WRONG", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new ResponseEntity<>("SOMETHING_WENT_WRONG",  HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
