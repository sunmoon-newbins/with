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
            return new User().toDTO(userMapper.getUserById(user));
        }
        return null;
    }

    @Override
    public boolean signup(User user) {
        log.info("[signup] : user = {}", user.toString());
        if(userMapper.findById(user.getId()) != null){
            return false;
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userMapper.setUser(user);
            return true;
        }
    }
}
