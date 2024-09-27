package com.newbins.service.impl;

import com.newbins.dto.ChattingRoom;
import com.newbins.entity.ChattingRoomEntity;
import com.newbins.mapper.ChattingMapper;
import com.newbins.service.UserChattingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class UserChattingServiceImpl implements UserChattingService {

    @Autowired
    private ChattingMapper chattingMapper;

    @Override
    public List<ChattingRoom> getChattingRooms(String userId) {
        try{
            List<ChattingRoomEntity> chattingRoomEntities = chattingMapper.getChattingRoomList(userId);
            log.info("[getChattingRooms] successful getChattingRoomList");
            List<ChattingRoom> chattingRooms = null;
            for(ChattingRoomEntity chattingRoom : chattingRoomEntities){
                chattingRooms.add(new ChattingRoom().toDTO(chattingRoom));
            }
            return chattingRooms;
        } catch(Exception e){
            log.error("[getChattingRooms] failed getChattingRoomList");
        }
        return null;
    }

    @Override
    public boolean enterTheChatting(String chattingId, String userId) {
        try{
            chattingMapper.setChattingUser(chattingId, userId);
            log.info("[enterTheChatting] successful setChattinguser");
            return true;
        } catch(Exception e){
            log.error("[enterTheChatting] failed insert chatting user");
        }
        return false;
    }
}
