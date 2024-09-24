package com.newbins.service;

import com.newbins.dto.User;
import com.newbins.dto.request.UserRequestDTO;
import com.newbins.dto.response.UserResponseDTO;

public interface UserService {
    UserResponseDTO login(UserRequestDTO userRequest);
    boolean signup(User user);
}
