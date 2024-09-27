package com.newbins.service.impl;

import com.newbins.entity.RouteEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.newbins.mapper.RouteMapper;
import com.newbins.dto.Route;
import com.newbins.service.RouteService;

@Service
@Slf4j
public class RouteServiceImpl implements RouteService {

    @Autowired
    private RouteMapper routeMapper;

    @Override
    public void createRoute(Route route) {
        //route에 있는 내용을 DB로 보냄
        log.info("[createRoute] : route = {}", route.toString());
        //값이 있는지 검증 해야 할까? ㄴㄴ 프론트에서 검증 하고 경로 식별 번호만 뒤에서 붙여주기

        routeMapper.createRoute(route);
    }

    @Override
    public Route getRouteByRouteNum(String routeNum) {
        log.info("[getRoute] : routeNum = {}", routeNum);
        return new Route().toDTO(routeMapper.getRouteByRouteNum(routeNum));
    }
}
