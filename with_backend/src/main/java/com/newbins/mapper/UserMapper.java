package com.newbins.mapper;

import com.newbins.dto.request.UserRequestDTO;
import com.newbins.dto.response.UserResponseDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    String getPasswordById(String password);
    UserResponseDTO getUserByIdPassword(UserRequestDTO userRequest);
}
