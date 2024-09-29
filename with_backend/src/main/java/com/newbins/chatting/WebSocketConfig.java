package com.newbins.chatting;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final WebSocketMessageHandler webSocketMessageHandler;

    public WebSocketConfig(WebSocketMessageHandler webSocketMessageHandler) {
        this.webSocketMessageHandler = webSocketMessageHandler;
    }

    // 웹소켓 핸들러 등록
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // WebSocket 엔드포인트 설정
        registry.addHandler(webSocketMessageHandler, "/users/{userId}/chatting/{chattingId}/ws")
                .setAllowedOrigins("*")
                .addInterceptors(new HandshakeInterceptor() {
                    // 클라이언트와 서버 간에 WebSocket 연결을 설정(핸드셰이크)
                    @Override
                    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
                        String path = request.getURI().getPath();
                        String[] pathSegments = path.split("/");
                        if (pathSegments.length >= 5) {
                            String userId = pathSegments[2];
                            String chattingId = pathSegments[4];

                            attributes.put("userId", userId);
                            attributes.put("chattingId", chattingId);
                        } else {
                            throw new IllegalArgumentException("Invalid WebSocket path");
                        }
                        return true;
                    }

                    // 연결 후 실행
                    @Override
                    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

                    }
                });
    }
}

