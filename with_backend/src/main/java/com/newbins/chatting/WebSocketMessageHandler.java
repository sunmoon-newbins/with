package com.newbins.chatting;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.newbins.dto.Message;
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
        String userId = (String) attributes.get("userId");
        String chattingId = (String) attributes.get("chattingId");

        ChatRoom chatRoom = chatRoomService.getOrCreateChatRoom(chattingId);
        chatRoom.addSession(session);

//        if(userChattingService.enterTheChatting(chattingId, userId)){
//            session.sendMessage(new TextMessage(userService.getUser(userId).getName()+"님이 입장했습니다."));
//        }
    }

    // 메시지 수신 시 실행
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Map<String, Object> attributes = session.getAttributes();
        String userId = (String) attributes.get("userId");
        String chattingId = (String) attributes.get("chattingId");

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule()); // LocalDateTime 처리 모듈 추가
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // ISO 형식으로 직렬화

        Message messageObj = userChattingService.sendMessage(chattingId, userId, message.getPayload());

        ChatRoom chatRoom = chatRoomService.getOrCreateChatRoom(chattingId);

        // 받은 메시지를 모든 연결된 클라이언트에게 전달
        for (WebSocketSession webSocketSession : chatRoom.getSessions()) {
            webSocketSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(messageObj)));
        }
    }

    // WebSocket 연결 종료 시 실행
    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        Map<String, Object> attributes = session.getAttributes();
        String userId = (String) attributes.get("userId");
        String chattingId = (String) attributes.get("chattingId");

        ChatRoom chatRoom = chatRoomService.getOrCreateChatRoom(chattingId);
        chatRoom.removeSession(session); // 연결 종료 시 세션 삭제
    }
}
