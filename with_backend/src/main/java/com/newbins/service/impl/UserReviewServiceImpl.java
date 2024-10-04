package com.newbins.service.impl;

import com.newbins.dto.Notice;
import com.newbins.dto.Review;
import com.newbins.entity.NoticeEntity;
import com.newbins.entity.ReviewEntity;
import com.newbins.mapper.NoticeMapper;
import com.newbins.mapper.ReviewMapper;
import com.newbins.service.UserReviewService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class UserReviewServiceImpl implements UserReviewService {

    @Autowired
    private ReviewMapper reviewMapper;

    @Autowired
    private NoticeMapper noticeMapper;

    @Override
    public List<Review> getMyReviews(String userId) {
        List<Review> reviewList = new ArrayList<>();
        try{
            List<ReviewEntity> reviewEntities = reviewMapper.getReviewsByUserId(userId);
            log.info("[getMyReviews] successful get reviews");
            for(ReviewEntity reviewEntity : reviewEntities){
                reviewList.add(new Review().toDTO(reviewEntity));
            }
        } catch(Exception e){
            log.error("[getMyReviews] failed get reviews");
        }
        return reviewList;
    }

    @Override
    public void writeReview(String userId, Review review) {
        try{
            int insertRows = reviewMapper.setReview(userId, review);
            if(insertRows > 0){
                log.info("[writeReview] successful write review");
                noticeMapper.setNotice(userId, review.getRouteId());
            } else {
                log.warn("[writeReview] no insert review");
            }
        } catch(Exception e){
            log.error("[writeReview] failed write review");
        }
    }
}
