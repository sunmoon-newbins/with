package com.newbins.service.impl;

import com.newbins.dto.User;
import com.newbins.mapper.UserMapper;
import com.newbins.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(){
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public User login(User user) {
        String storedHashedPassword = userMapper.getPasswordById(user.getId());
        log.info("[login] : storedHashedPassword = {}", storedHashedPassword);
        if(passwordEncoder.matches(user.getPassword(), storedHashedPassword)){
            return new User().toDTO(userMapper.getUserByIdPassword(user.getId(), storedHashedPassword));
        }
        return null;
    }

    @Override
    public boolean signup(User user) {
        if(userMapper.findById(user.getId()) != null){
            log.warn("[signup] : failed signup");
            return false;
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userMapper.setUser(user);
            log.info("[signup] : successful signup");
            return true;
        }
    }

    @Override
    public User getUser(String userId) {
        return new User().toDTO(userMapper.getUserByUserId(userId));
    }

    @Override
    public User changeProfile(User user) {
        try{
            userMapper.updateProfileByUserId(user);
            log.info("[changeProfile] : successful change profile");
        } catch(Exception e){
            log.error("[changeProfile] : failed change profile, error = {}", e);
        }
        return new User().toDTO(userMapper.getUserByUserId(user.getUserId()));
    }
}
