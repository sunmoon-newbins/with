package com.newbins.controller.users;

import com.newbins.dto.Route;
import com.newbins.dto.WriteRoute;
import com.newbins.service.RouteLikeService;
import com.newbins.service.RouteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/users/{userId}/routes")
public class UserRouteController {

    @Autowired
    RouteService routeService;

    @Autowired
    RouteLikeService routeLikeService;

    // 게시한 루트 보기
    @GetMapping
    public List<Route> getMyRoutes(@PathVariable("userId") String userId){
        return routeService.getRoutes(userId);
    }

    // 루트 게시판 작성
    @PostMapping
    public void createRoute(@PathVariable("userId") String userId,
                            @RequestBody WriteRoute writeRoute){

        log.info("[createRoute] : route = {}", writeRoute.toString());
        routeService.createRoute(userId, writeRoute);
    }

    // 좋아요 누른 루트 보기
    @GetMapping("/liked")
    public List<Route> getLikedRoutes(@PathVariable("userId") String userId){
        log.info("[getLikedRoutes] : userId = {}", userId);
        return routeLikeService.getLikedRoutes(userId);
    }
}
