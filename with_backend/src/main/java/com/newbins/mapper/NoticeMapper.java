package com.newbins.mapper;

import com.newbins.entity.NoticeEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NoticeMapper {
    List<NoticeEntity> getNoticesByUserId(String userId);

    int setNotice(@Param("userId")String userId, @Param("routeId") String routeId);
}
