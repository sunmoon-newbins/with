package com.newbins.chatting;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Service
public class NotificationService {

    private final WebSocketMessageHandler webSocketMessageHandler;

    public NotificationService(WebSocketMessageHandler webSocketMessageHandler) {
        this.webSocketMessageHandler = webSocketMessageHandler;
    }

    public void sendNotificationToClients(String message) throws Exception {
        for (WebSocketSession session : webSocketMessageHandler.getSessions()) {
            session.sendMessage(new TextMessage(message));
        }
    }
}
