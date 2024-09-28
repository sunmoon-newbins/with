package com.newbins.service;

import com.newbins.dto.Chatting;
import com.newbins.dto.ChattingRoom;

import java.util.List;

public interface UserChattingService {
    List<ChattingRoom> getChattingRooms(String userId);
    boolean enterTheChatting(String chattingId, String userId);
    Chatting getChattingRoomInfo(String chattingId, String userid);
}
