package com.newbins.controller.users;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/users/{user_id}/routes")
public class UserRouteController {

    // 게시한 루트 보기
    @GetMapping
    public void getMyRoutes(@PathVariable("user_id") String userId){

    }

}
