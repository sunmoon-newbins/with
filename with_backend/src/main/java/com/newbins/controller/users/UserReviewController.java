package com.newbins.controller.users;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/users/{user_id}/reviews")
public class UserReviewController {

    // 받은 후기 목록
    @GetMapping
    public void getMyReviews(@PathVariable("user_id") String userId){

    }

    // 알림 클릭 후 리뷰 쓰기
    @PostMapping
    public void setReview(@PathVariable("user_id") String userId){

    }
}
