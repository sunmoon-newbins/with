package com.newbins.chatting;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ChatRoomService {
    // 모든 채팅방을 관리하는 Map
    private Map<String, ChatRoom> chatRooms = new HashMap<>();

    // 채팅방을 생성하거나 이미 존재하면 반환
    public ChatRoom getOrCreateChatRoom(String roomId) {
        return chatRooms.computeIfAbsent(roomId, ChatRoom::new);
    }

    public ChatRoom getChatRoom(String roomId) {
        return chatRooms.get(roomId);
    }
}