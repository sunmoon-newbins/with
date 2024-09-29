package com.newbins.controller.users;

import com.newbins.dto.User;
import com.newbins.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    UserService userService;

    // 로그인
    @PostMapping("/login")
    public User login(@RequestBody User userRequest){
        log.info("[login] : id = {}", userRequest.getId());
        User userResponse = userService.login(userRequest);
        log.info("[login/result] : user = {}", userResponse);
        return userResponse;
    }

    // 회원가입
    @PostMapping("/signup")
    public boolean signup(@RequestBody User user){
        return userService.signup(user);
    }

    // 프로필 보기
    @GetMapping("/{user_id}")
    public User getUser(@PathVariable("user_id") String userId){
        return userService.getUser(userId);
    }

    // 프로필 사진 변경
    @PatchMapping("/{user_id}")
    public User changeProfile(@PathVariable("user_id") String userId,
                              @RequestBody User user){
        user.setUserId(userId);
        return userService.changeProfile(user);
    }

}
