package com.newbins.controller.routes;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/routes/{route_id}/map")
public class RouteMapController {

    // 루트 상세에서 지도 보기
    @GetMapping
    public void getRouteMap(@PathVariable("route_id") String routeId){

    }
}
