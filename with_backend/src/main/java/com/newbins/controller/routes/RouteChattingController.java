package com.newbins.controller.routes;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/routes/{route_id}/chatting")
public class RouteChattingController {

    // 특정 루트 채팅방(여행 일정 참가하기)
    @GetMapping
    public void getRouteChatting(@PathVariable("route_id") String routeId){

    }
}
