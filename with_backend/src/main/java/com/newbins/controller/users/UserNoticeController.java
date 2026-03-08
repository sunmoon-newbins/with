package com.newbins.controller.users;

import com.newbins.dto.Notice;
import com.newbins.service.UserNoticeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/users/{user_id}/notices")
public class UserNoticeController {

    @Autowired
    private UserNoticeService userNoticeService;

    // 나의 알림
    @GetMapping
    public List<Notice> getMyNotices(@PathVariable("user_id") String userId){
        return userNoticeService.getMyNotices(userId);
    }
}
