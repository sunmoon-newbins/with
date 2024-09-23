package com.newbins.controller.users;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/users/{user_id}/chatting")
public class UserChattingController {

    // 채팅방 페이지로 이동(내 채팅방 목록)
    @GetMapping
    public void getChattings(@PathVariable("user_id") String userId){

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
