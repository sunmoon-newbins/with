package com.newbins.mapper;

import com.newbins.dto.Place;
import com.newbins.dto.User;
import com.newbins.entity.UsersEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    String getPasswordById(String password);
    UsersEntity getUserByUserId(String userId);
    String findById(String id);
    void setUser(User user);
    void updateProfileByUserId(User user);
}
