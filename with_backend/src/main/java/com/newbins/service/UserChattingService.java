package com.newbins.service;

import com.newbins.dto.Chatting;
import com.newbins.dto.ChattingRoom;
import com.newbins.dto.Message;

import java.util.List;

public interface UserChattingService {
    List<ChattingRoom> getChattingRooms(String userId);
    boolean enterTheChatting(String chattingId, String userId);
    Chatting getChattingRoomInfo(String chattingId, String userid);
    Message sendMessage(String chattingId, String userId, String message);
    void leaveTheChatting(String chattingId, String userId);
}
