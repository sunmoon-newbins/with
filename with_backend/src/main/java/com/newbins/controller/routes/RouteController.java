package com.newbins.controller.routes;

import com.newbins.entity.RouteEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.newbins.dto.Route;
import com.newbins.service.RouteService;

@Slf4j
@RestController
@RequestMapping("/routes")
public class RouteController {

    @Autowired
    RouteService routeService;

    // 소개, 모집, 전체 게시글 보기
    @GetMapping
    public void getRoutes(@RequestParam(required = false) String state,
                          @RequestParam(required = false) String sort){

    }

    // 루트 게시판 작성
    @PostMapping
    public void createRoute(@RequestBody Route route){

        log.info("[createRoute] : route = {}", route.toString());
        routeService.createRoute(route);
    }

    // 루트 상세 보기
    @GetMapping("/{routeNum}")
    public Route getRoute(@PathVariable("routeNum") String routeNum){
        //route 1건 가지고 오기
        log.info("[getRoute] : routeNum = {}", routeNum);
        Route routeInfo = routeService.getRouteByRouteNum(routeNum);
        log.info("[getRouteReturnValue] : routeNum = {}", routeInfo);
        return routeInfo;
    }

//    // 루트 검색
//    @GetMapping("/search")
//    public void getSearchRoutes(@RequestParam(required = false) String search){
//
//    }
//
//    // 좋아요 누른 게시글 보기 + 소개, 모집, 전체 보기
//    @GetMapping("/{user_id}")
//    public void getUserRoutes(@PathVariable("user_id") String userId,
//                              @RequestParam(required = false) String state){
//
//    }


}
