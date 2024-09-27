package com.newbins.chatting;

import com.newbins.service.UserChattingService;
import com.newbins.service.UserService;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;

@Component
public class WebSocketMessageHandler extends TextWebSocketHandler {

    // 연결된 클라이언트 세션을 저장할 리스트
    private final NotificationService notificationService = new NotificationService(this);
    private final ChatRoomService chatRoomService;
    private final UserChattingService userChattingService;
    private final UserService userService;

    public WebSocketMessageHandler(ChatRoomService chatRoomService, UserChattingService userChattingService, UserService userService){
        this.chatRoomService = chatRoomService;
        this.userChattingService = userChattingService;
        this.userService = userService;
    }

    // WebSocket 연결시 실행
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        Map<String, Object> attributes = session.getAttributes();
        String userId = (String) attributes.get("user_id");
        String chattingId = (String) attributes.get("chatting_id");

        ChatRoom chatRoom = chatRoomService.getOrCreateChatRoom(chattingId);
        chatRoom.addSession(session);
        if(userChattingService.enterTheChatting(chattingId, userId)){
            session.sendMessage(new TextMessage(userService.getUser(userId).getName()+"님이 입장했습니다."));
        }
    }

    // 메시지 수신 시 실행
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Map<String, Object> attributes = session.getAttributes();
        String userId = (String) attributes.get("user_id");
        String chattingId = (String) attributes.get("chatting_id");

        ChatRoom chatRoom = chatRoomService.getOrCreateChatRoom(chattingId);

        // 받은 메시지를 모든 연결된 클라이언트에게 전달
        for (WebSocketSession webSocketSession : chatRoom.getSessions()) {
            webSocketSession.sendMessage(new TextMessage("New message: " + message.getPayload()));
        }
        notificationService.sendNotificationToClients(message.getPayload());
    }

    // WebSocket 연결 종료 시 실행
    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        Map<String, Object> attributes = session.getAttributes();
        String userId = (String) attributes.get("user_id");
        String chattingId = (String) attributes.get("chatting_id");

        ChatRoom chatRoom = chatRoomService.getOrCreateChatRoom(chattingId);
        chatRoom.removeSession(session); // 연결 종료 시 세션 삭제
    }
}
