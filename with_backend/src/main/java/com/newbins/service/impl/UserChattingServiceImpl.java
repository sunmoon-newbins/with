package com.newbins.service.impl;

import com.newbins.dto.Chatting;
import com.newbins.dto.ChattingRoom;
import com.newbins.dto.Message;
import com.newbins.dto.User;
import com.newbins.entity.ChattingRoomEntity;
import com.newbins.entity.MessageEntity;
import com.newbins.entity.UsersEntity;
import com.newbins.mapper.ChattingMapper;
import com.newbins.mapper.UserMapper;
import com.newbins.service.UserChattingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.TextMessage;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class UserChattingServiceImpl implements UserChattingService {

    @Autowired
    private ChattingMapper chattingMapper;

    @Override
    public List<ChattingRoom> getChattingRooms(String userId) {
        List<ChattingRoom> chattingRooms = new ArrayList<>();
        try{
            List<ChattingRoomEntity> chattingRoomEntities = chattingMapper.getChattingRoomList(userId);
            log.info("[getChattingRooms] successful getChattingRoomList, chattingRoomEntities = {}", chattingRoomEntities);
            for(ChattingRoomEntity chattingRoom : chattingRoomEntities){
                chattingRooms.add(new ChattingRoom().toDTO(chattingRoom));
            }
            log.info("[getChattingsRoom] chattingRooms = {}", chattingRooms);
        } catch(Exception e){
            log.error("[getChattingRooms] failed getChattingRooms");
        }
        return chattingRooms;
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

    @Override
    public Chatting getChattingRoomInfo(String chattingId, String userId) {
        List<Message> messageList = new ArrayList<>();
        List<User> userList = new ArrayList<>();
        try{
            List<MessageEntity> messageEntities = chattingMapper.getMessages(chattingId, userId);
            log.info("[getChattingRoomInfo] successful getMessages, messageEntities = {}", messageEntities);
            if(messageEntities != null){
                for(MessageEntity messageEntity : messageEntities){
                    messageList.add(new Message().toDTO(messageEntity));
                }
            }

            List<UsersEntity> usersEntities = chattingMapper.getChattingUsers(chattingId);
            log.info("[getChattingRoomInfo] successful getChattingUsers, usersEntities = {}", usersEntities);
            for(UsersEntity usersEntity : usersEntities){
                userList.add(new User().toDTO(usersEntity));
            }

        } catch(Exception e){
            log.error("[getChattingRoomInfo] failed", e);
        }
        return new Chatting().builder()
                .messages(messageList)
                .users(userList)
                .build();
    }

    @Override
    @Transactional
    public Message sendMessage(String chattingId, String userId, String message) {
        Map<String, Object> params = new HashMap<>();
        params.put("chattingId", chattingId);
        params.put("userId", userId);
        params.put("message", message);

        try{
            chattingMapper.setMessage(params);
            long insertMessageId = ((BigInteger) params.get("messageId")).longValue();
            if(insertMessageId != 0){
                log.info("[sendMessage] successful setMessage, messageId = {}", insertMessageId);
                chattingMapper.setMessageReadStatus(userId);
            } else {
                throw new Exception();
            }
            MessageEntity messageEntity = chattingMapper.getMessageById(insertMessageId);
            log.info("[sendMessage] successful get message info");
            return new Message().toDTO(messageEntity);
        } catch(Exception e){
            log.error("[sendMessage] failed send message");
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void leaveTheChatting(String chattingId, String userId) {
        try{
            chattingMapper.updateChattingUserLeaveDT(chattingId, userId);
            log.info("[leaveTheChatting] successful {} leave chatting", userId);
        } catch(Exception e){
            log.error("[leaveTheChatting] failed {} leave chatting", userId);
        }
    }
}
