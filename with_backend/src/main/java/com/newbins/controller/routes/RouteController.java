package com.newbins.controller.routes;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/routes")
public class RouteController {

    // 소개, 모집, 전체 게시글 보기
    @GetMapping
    public void getRoutes(@RequestParam(required = false) String state,
                          @RequestParam(required = false) String sort){

    }

    // 루트 게시판 작성
    @PostMapping
    public void setRoute(){

    }

    // 루트 상세 보기
    @GetMapping("/{route_id}")
    public void getRoute(@PathVariable("route_id") String routeId){

    }

    // 루트 검색
    @GetMapping("/search")
    public void getSearchRoutes(@RequestParam(required = false) String search){

    }

    // 좋아요 누른 게시글 보기 + 소개, 모집, 전체 보기
    @GetMapping("/{user_id}")
    public void getUserRoutes(@PathVariable("user_id") String userId,
                              @RequestParam(required = false) String state){

    }


}
