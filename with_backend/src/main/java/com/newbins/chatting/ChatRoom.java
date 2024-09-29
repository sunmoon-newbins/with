package com.newbins.chatting;

import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.TextMessage;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class ChatRoom {
    private String roomId;
    private Set<WebSocketSession> sessions = new HashSet<>(); // 채팅방에 연결된 클라이언트들

    public ChatRoom(String roomId) {
        this.roomId = roomId;
    }

    public String getRoomId() {
        return roomId;
    }

    public Set<WebSocketSession> getSessions() {
        return sessions;
    }

    public void addSession(WebSocketSession session) {
        sessions.add(session);
    }

    public void removeSession(WebSocketSession session) {
        sessions.remove(session);
    }

    public void broadcastMessage(TextMessage message) throws IOException {
        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
                session.sendMessage(message);
            }
        }
    }
}