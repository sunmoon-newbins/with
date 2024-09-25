package com.newbins.service;

import com.newbins.dto.User;

public interface UserService {
    User login(User user);
    boolean signup(User user);
    User getUser(String userId);
    User changeProfile(User user);
}
