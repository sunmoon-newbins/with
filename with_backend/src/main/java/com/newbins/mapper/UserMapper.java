package com.newbins.mapper;

import com.newbins.dto.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    String getPasswordById(String password);
    User getUserByIdPassword(User user);
    String findById(String id);
    void setUser(User user);
}
