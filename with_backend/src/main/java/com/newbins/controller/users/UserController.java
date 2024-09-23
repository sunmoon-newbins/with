package com.newbins.controller.users;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/users")
public class UserController {

    // 로그인
    @GetMapping
    public void login(){

    }

    // 회원가입
    @PostMapping
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
