package com.newbins.mapper;

import com.newbins.dto.Review;
import com.newbins.entity.ReviewEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReviewMapper {
    List<ReviewEntity>  getReviewsByUserId(String userId);

    int setReview(@Param("userId") String userId, @Param("review") Review review);
}
