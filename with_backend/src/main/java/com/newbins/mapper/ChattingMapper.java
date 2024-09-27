package com.newbins.mapper;

import com.newbins.entity.ChattingRoomEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ChattingMapper {
    List<ChattingRoomEntity> getChattingRoomList(String userId);
}
