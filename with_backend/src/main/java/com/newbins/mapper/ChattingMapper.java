package com.newbins.mapper;

import com.newbins.entity.ChattingRoomEntity;
import com.newbins.entity.MessageEntity;
import com.newbins.entity.UsersEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChattingMapper {
    List<ChattingRoomEntity> getChattingRoomList(String userId);
    void setChattingUser(@Param("chattingId") String chattingId, @Param("userId")String userId);
    List<MessageEntity> getMessages(@Param("chattingId")String chattingId, @Param("userId")String userId);
    List<UsersEntity> getChattingUsers(String chattingId);
    long setMessage(Map<String, Object> params);
    void setMessageReadStatus(String userId);
    MessageEntity getMessageById(long messageId);
    void updateChattingUserLeaveDT(String chattingId, String userId);
    String getChattingIdByRouteId(String routeId);
    Map<String, Object> getChattingWriterInfo(String chattingId);
}
