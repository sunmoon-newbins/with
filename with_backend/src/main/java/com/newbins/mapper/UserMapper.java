package com.newbins.mapper;

import com.newbins.dto.User;
import com.newbins.entity.UsersEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    String getPasswordById(String password);
    UsersEntity getUserById(String userId);
    String findById(String id);
    void setUser(User user);
}
