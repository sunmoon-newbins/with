package com.newbins.mapper;

import com.newbins.entity.ReviewEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {
    List<ReviewEntity>  getReviewsByUserId(String userId);
}
