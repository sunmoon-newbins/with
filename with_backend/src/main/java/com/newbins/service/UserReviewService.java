package com.newbins.service;

import com.newbins.dto.Notice;
import com.newbins.dto.Review;

import java.util.List;

public interface UserReviewService {
    List<Review> getMyReviews(String userId);
    List<Notice> getMyNotices(String userId);
}
