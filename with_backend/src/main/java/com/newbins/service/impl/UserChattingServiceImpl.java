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
import org.springframework.web.socket.TextMessage;

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

    @Override
    public Chatting getChattingRoomInfo(String chattingId, String userId) {
        List<Message> messageList = null;
        List<User> userList = null;
        try{
            List<MessageEntity> messageEntities = chattingMapper.getMessages(chattingId, userId);
            log.info("[getChattingRoomInfo] successful getMessages");
            if(messageEntities != null){
                for(MessageEntity messageEntity : messageEntities){
                    messageList.add(new Message().toDTO(messageEntity));
                }
            }

            List<UsersEntity> usersEntities = chattingMapper.getChattingUsers(chattingId);
            log.info("[getChattingRoomInfo] sucessful getChattingUsers");
            for(UsersEntity usersEntity : usersEntities){
                userList.add(new User().toDTO(usersEntity));
            }

        } catch(Exception e){
            log.error("[getChattingRoomInfo] failed");
        }
        return new Chatting().builder()
                .messages(messageList)
                .users(userList)
                .build();
    }

    @Override
    public Message sendMessage(String chattingId, String userId, String message) {
        try{
            long messageId = chattingMapper.setMessage(chattingId, userId, message);
            log.info("[sendMessage] successful send message, messageId = {}", messageId);
            MessageEntity messageEntity = chattingMapper.getMessageById(messageId);
            log.info("[sendMessage] successful get message info");
            return new Message().toDTO(messageEntity);
        } catch(Exception e){
            log.error("[sendMessage] failed send message");
        }
        return null;
    }
}
