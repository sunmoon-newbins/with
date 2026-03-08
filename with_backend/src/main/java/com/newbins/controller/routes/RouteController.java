package com.newbins.controller.routes;

import com.newbins.dto.Route;
import com.newbins.dto.RoutePlace;
import com.newbins.dto.User;
import com.newbins.service.RouteChattingService;
import com.newbins.service.RouteLikeService;
import com.newbins.service.RouteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/routes")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @Autowired
    private RouteLikeService routeLikeService;

    @Autowired
    private RouteChattingService routeChattingService;

    // 소개, 모집, 전체 게시글 보기
    @GetMapping
    public List<Route> getRoutes(@RequestParam(defaultValue = "0") int state,
                                 @RequestParam(required = false) String sortType) {
        log.info("[getRoutes] : state = {}, sortType = {}", state, sortType);
        return routeService.getRoutes(state, sortType);
    }

    // 루트 검색
    @GetMapping("/search")
    public List<Route> searchRoutes(@RequestParam(required = false) String title,
                                    @RequestParam(required = false) String content) {
        log.info("[searchRoutes] : title = {}, content = {}", title, content);
        return routeService.searchRoutes(title, content);
    }

    // 루트 상세 보기
    @GetMapping("/{routeNum}")
    public Route getRoute(@PathVariable String routeNum) {
        log.info("[getRoute] : routeNum = {}", routeNum);
        Route routeInfo = routeService.getRoute(routeNum);
        log.info("[getRoute] : routeInfo = {}", routeInfo);
        return routeInfo;
    }

    // 루트 지도 보기
    @GetMapping("/{routeNum}/map")
    public List<RoutePlace> getRouteMap(@PathVariable String routeNum) {
        log.info("[getRouteMap] : routeNum = {}", routeNum);
        return routeService.getRoutePlace(routeNum);
    }

    // 루트 좋아요
    @PostMapping("/{routeNum}/like")
    public void likeRoute(@PathVariable String routeNum,
                          @RequestBody User userRequest) {
        log.info("[likeRoute] : routeNum = {}, userId = {}", routeNum, userRequest.getUserId());
        routeLikeService.likeRoute(routeNum, userRequest.getUserId());
    }

    // 루트 좋아요 취소
    @DeleteMapping("/{routeNum}/like")
    public void unlikeRoute(@PathVariable String routeNum,
                            @RequestBody User userRequest) {
        log.info("[unlikeRoute] : routeNum = {}, userId = {}", routeNum, userRequest.getUserId());
        routeLikeService.unlikeRoute(routeNum, userRequest.getUserId());
    }

    // 여행 일정 참가하기
    @PostMapping("/{routeNum}/chatting")
    public void joinRoute(@PathVariable String routeNum,
                          @RequestBody Map<String, String> request) {
        log.info("[joinRoute] : routeNum = {}, userId = {}", routeNum, request.get("user_id"));
        routeChattingService.travelParticipation(routeNum, request.get("user_id"));
    }
}
