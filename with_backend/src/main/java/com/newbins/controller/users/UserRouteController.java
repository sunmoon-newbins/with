package com.newbins.controller.users;

import com.newbins.dto.Route;
import com.newbins.dto.WriteRoute;
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
    // 게시한 루트 보기
    @GetMapping
    public List<Route> getMyRoutes(@PathVariable("userId") String userNum){
        return routeService.getRoutes(userNum);
    }

    // 루트 게시판 작성
    @PostMapping
    public void createRoute(@PathVariable("userId") String userId,
                            @RequestBody WriteRoute writeRoute){

        log.info("[createRoute] : route = {}", writeRoute.toString());
        routeService.createRoute(userId, writeRoute);
    }
}
