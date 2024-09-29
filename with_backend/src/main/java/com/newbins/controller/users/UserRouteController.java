package com.newbins.controller.users;

import com.newbins.dto.Route;
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
@RequestMapping(value = "/users/{userNum}/routes")
public class UserRouteController {

    @Autowired
    RouteService routeService;
    // 게시한 루트 보기
    @GetMapping
    public List<Route> getMyRoutes(@PathVariable("userNum") String userNum){
        return routeService.getRoutes(userNum);
    }

}
