package com.newbins.controller.routes;

import com.newbins.dto.User;
import com.newbins.service.RouteLikeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/routes/{route_id}/like")
public class RouteLikeController {

    @Autowired
    private RouteLikeService routeLikeService;

    // 루트 좋아요
    @PostMapping
    public void likeRoute(@PathVariable("route_id") String routeId,
                          @RequestBody User userRequest){
        log.info("[likeRoute] : routeId = {}, userId = {}", routeId, userRequest.getUserId());
        routeLikeService.likeRoute(routeId, userRequest.getUserId());
    }

    // 루트 좋아요 취소
    @DeleteMapping
    public void unlikeRoute(@PathVariable("route_id") String routeId,
                            @RequestBody User userRequest){
        log.info("[unlikeRoute] : routeId = {}, userId = {}", routeId, userRequest.getUserId());
        routeLikeService.unlikeRoute(routeId, userRequest.getUserId());
    }

}
