package com.newbins.controller.users;

import com.newbins.service.UserNoticeService;
import com.newbins.service.UserReviewService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/users/{user_id}/notices")
public class UserNoticeController {

    @Autowired
    private UserNoticeService userNoticeService;

    // 나의 알림
    @GetMapping
    public void getMyNotices(@PathVariable("user_id") String userId){
        userNoticeService.getMyNotices(userId);
    }
}
