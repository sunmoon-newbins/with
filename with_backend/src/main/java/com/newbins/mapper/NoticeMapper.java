package com.newbins.mapper;

import com.newbins.entity.NoticeEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeMapper {
    List<NoticeEntity> getNoticesByUserId(String userId);
}
