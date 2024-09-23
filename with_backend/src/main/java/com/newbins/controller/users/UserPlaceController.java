package com.newbins.controller.users;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/users/{user_id}/places")
public class UserPlaceController {

    // 나만의 장소 추가
    @PostMapping
    public void setUserPlace(@PathVariable("user_id") String userId){

    }
}
