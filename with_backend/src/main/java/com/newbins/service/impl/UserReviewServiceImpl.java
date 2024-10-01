package com.newbins.service.impl;

import com.newbins.dto.Notice;
import com.newbins.dto.Review;
import com.newbins.entity.NoticeEntity;
import com.newbins.entity.ReviewEntity;
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
    public List<Notice> getMyNotices(String userId) {
        List<Notice> noticeList = new ArrayList<>();
        try{
            List<NoticeEntity> noticeEntities = reviewMapper.getNoticesByUserId(userId);
            log.info("[getMyNotice] successful get my notices");
            for(NoticeEntity noticeEntity : noticeEntities){
                noticeList.add(new Notice().toDTO(noticeEntity));
            }
        }catch(Exception e){
            log.info("[getMyNotice] failed get my notices");
        }
        return noticeList;
    }
}
