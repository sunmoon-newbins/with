package com.newbins.controller.routes;

import com.newbins.service.RouteChattingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/routes/{route_id}/chatting")
public class RouteChattingController {

    @Autowired
    private RouteChattingService routeChattingService;

    // 특정 루트 채팅방(여행 일정 참가하기)
    @PostMapping
    public void setRouteChatting(@PathVariable("route_id") String routeId,
                                 @RequestBody Map<String, String> request){
        routeChattingService.travelParticipation(routeId, request.get("user_id"));
    }
}
