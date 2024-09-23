package com.newbins.controller.users;

import com.newbins.dto.request.UserRequestDTO;
import com.newbins.dto.response.UserResponseDTO;
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
    public UserResponseDTO login(@RequestBody UserRequestDTO userRequest){
        log.info("[login] : id = {}", userRequest.getId());
        UserResponseDTO userResponse = userService.login(userRequest);
        log.info("[login] : userId = {}", userResponse);
        return userResponse;
    }

    // 회원가입
    @PostMapping("/signup")
    public void signup(){

    }

    // 프로필 보기
    @GetMapping("/{user_id}")
    public void getUser(@PathVariable("user_id") String userId){

    }

    // 프로필 사진 변경
    @PatchMapping("/{user_id}")
    public void changeProfile(@PathVariable("user_id") String userId){

    }

}
