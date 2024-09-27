package com.newbins.controller.users;

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

    // 채팅방 페이지로 이동(내 채팅방 목록)
    @GetMapping
    public List<ChattingRoom> getChattings(@PathVariable("user_id") String userId){
        log.info("[getChatting] before getChattings");
        return userChattingService.getChattingRooms(userId);
    }

    // 채팅방 상세
    @GetMapping("/{chatting_id}")
    public void getChatting(@PathVariable("user_id") String userId,
                            @PathVariable("chatting_id") String chattingId){

    }

    // 채팅방 나가기
    @DeleteMapping("/{chatting_id}")
    public void exitChatting(@PathVariable("user_id") String userId,
                             @PathVariable("chatting_id") String chattingId){

    }
}
