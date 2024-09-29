package com.newbins.mapper;

import com.newbins.entity.ChattingRoomEntity;
import com.newbins.entity.MessageEntity;
import com.newbins.entity.UsersEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ChattingMapper {
    List<ChattingRoomEntity> getChattingRoomList(String userId);
    void setChattingUser(@Param("chattingId") String chattingId, @Param("userId")String userId);
    List<MessageEntity> getMessages(@Param("chattingId")String chattingId, @Param("userId")String userId);
    List<UsersEntity> getChattingUsers(String chattingId);
}
