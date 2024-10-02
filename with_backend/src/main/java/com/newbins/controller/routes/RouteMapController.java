package com.newbins.controller.routes;

import com.newbins.dto.RoutePlace;
import com.newbins.service.RouteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/routes/{routeNum}/map")
public class RouteMapController {

    @Autowired
    RouteService routeService;
    // 루트 상세에서 지도 보기
    @GetMapping
    public List<RoutePlace> getRouteMap(@PathVariable("routeNum") String routeNum){
        log.info("[getRouteMap] : routeNum = {}", routeNum);
        return routeService.getRoutePlace(routeNum);
    }
}
