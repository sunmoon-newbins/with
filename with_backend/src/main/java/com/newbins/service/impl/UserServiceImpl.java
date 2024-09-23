package com.newbins.service.impl;

import com.newbins.dto.request.UserRequestDTO;
import com.newbins.dto.response.UserResponseDTO;
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
    public UserResponseDTO login(UserRequestDTO userRequest) {
        String storedHashedPassword = userMapper.getPasswordById(userRequest.getId());
        if(passwordEncoder.matches(userRequest.getPassword(), storedHashedPassword)){
            return userMapper.getUserByIdPassword(userRequest);
        }
        return null;
    }
}
