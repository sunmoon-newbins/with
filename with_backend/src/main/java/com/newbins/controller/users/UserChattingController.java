package com.newbins.controller.users;

import com.newbins.dto.Chatting;
import com.newbins.dto.ChattingRoom;
import com.newbins.service.UserChattingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping(value = "/users/{user_id}/chatting")
public class UserChattingController {

    @Autowired
    private UserChattingService userChattingService;

    // 내 채팅방 목록
    @GetMapping
    public List<ChattingRoom> getChattings(@PathVariable("user_id") String userId){
        log.info("[getChattings] before getChattings, userId = {}", userId);
        List<ChattingRoom> chattingRoomList = userChattingService.getChattingRooms(userId);
        log.info("[getChattings] after getChattings, chattingRoomList = {}", chattingRoomList);
        return  chattingRoomList;
    }

    // 채팅방 들어가기(채팅방 상세)
    @GetMapping("/{chatting_id}")
    public Chatting getChatting(@PathVariable("user_id") String userId,
                                @PathVariable("chatting_id") String chattingId){
        log.info("[getChatting] chattingId = {}, userId = {}", chattingId, userId);
        Chatting chatting =  userChattingService.getChattingRoomInfo(chattingId, userId);
        log.info("[getChatting] chatting = {}", chatting);
        return chatting;
    }

    // 채팅방 나가기
    @DeleteMapping("/{chatting_id}")
    public void exitChatting(@PathVariable("user_id") String userId,
                             @PathVariable("chatting_id") String chattingId){
        userChattingService.leaveTheChatting(chattingId, userId);
    }
}
