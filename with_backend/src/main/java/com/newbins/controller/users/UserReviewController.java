package com.newbins.controller.users;

import com.newbins.dto.Review;
import com.newbins.service.UserReviewService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/users/{user_id}/reviews")
public class UserReviewController {

    @Autowired
    private UserReviewService userReviewService;

    // 받은 후기 목록
    @GetMapping
    public List<Review> getMyReviews(@PathVariable("user_id") String userId){
        return userReviewService.getMyReviews(userId);
    }

    // 알림 클릭 후 리뷰 쓰기
    @PostMapping
    public void setReview(@PathVariable("user_id") String userId){

    }
}
