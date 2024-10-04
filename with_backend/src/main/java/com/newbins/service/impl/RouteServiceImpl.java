package com.newbins.service.impl;

import com.newbins.dto.RoutePlace;
import com.newbins.entity.RouteEntity;
import com.newbins.entity.RoutePlaceEntity;
import com.newbins.mapper.RoutePlaceMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.newbins.mapper.RouteMapper;
import com.newbins.dto.Route;
import com.newbins.service.RouteService;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class RouteServiceImpl implements RouteService {

    @Autowired
    private RouteMapper routeMapper;
    @Autowired
    private RoutePlaceMapper routePlaceMapper;

    @Override
    public void createRoute(Route route) {
        //route에 있는 내용을 DB로 보냄
        log.info("[createRoute] : route = {}", route.toString());
        //값이 있는지 검증 해야 할까? ㄴㄴ 프론트에서 검증 하고 경로 식별 번호만 뒤에서 붙여주기

        routeMapper.createRoute(route);
    }

    @Override
    public Route getRoute(String routeNum) {
        log.info("[getRoute] : routeNum = {}", routeNum);
        return new Route().toDTO(routeMapper.getRoute(routeNum));
    }

    @Override
    public List<Route> getRoutes(int state, String sortType) {
        List<Route> routes = new ArrayList<>();
        // MyBatis Mapper를 호출하여 RouteEntity 목록을 받아옵니다.
        try{
            List<RouteEntity> routeEntities = routeMapper.getRoutes(state, sortType);
            log.info("[getRoutes] successful getRoutes, routeEntities = {}", routeEntities);
            for (RouteEntity entity : routeEntities) {
                routes.add(new Route().toDTO(entity)); // Route 클래스에 정의된 toDTO() 메서드 사용
            }
        } catch (Exception e){
            log.error("[getRoutes] failed getRoutes", e);
        }
        // RouteEntity를 Route로 변환하여 List로 반환
        return routes;
    }

    @Override
    public List<Route> searchRoutes(String title, String content) {
        // MyBatis Mapper를 호출하여 RouteEntity 목록을 받아옵니다.
        List<RouteEntity> routeEntities = routeMapper.searchRoutes(title, content);

        // RouteEntity를 Route로 변환하여 List로 반환
        List<Route> routes = new ArrayList<>();
        for (RouteEntity entity : routeEntities) {
            Route route = new Route();
            routes.add(route.toDTO(entity)); // Route 클래스에 정의된 toDTO() 메서드 사용
        }
        return routes;
    }

    @Override
    public List<RoutePlace> getRoutePlace(String routeNum) {
        List<RoutePlaceEntity> routePlaceEntities = routePlaceMapper.getRoutePlaceByRouteNum(routeNum);
        // RoutePlaceEntity를 RoutePlace로 변환하여 List로 반환
        List<RoutePlace> routePlaces = new ArrayList<>();
        for (RoutePlaceEntity entity : routePlaceEntities) {
            RoutePlace routePlace = new RoutePlace();
            routePlaces.add(routePlace.toDTO(entity)); // Route 클래스에 정의된 toDTO() 메서드 사용
        }
        return routePlaces;
    }

    public List<Route> getRoutes(String userNum) {
        //조건으로 status 넣고, 정렬 sortType
        log.info("[getRoutes] : userNum = {}", userNum);
        // MyBatis Mapper를 호출하여 RouteEntity 목록을 받아옵니다.
        List<RouteEntity> routeEntities = routeMapper.getRouteByUserNum(userNum);

        // RouteEntity를 Route로 변환하여 List로 반환
        List<Route> routes = new ArrayList<>();
        for (RouteEntity entity : routeEntities) {
            Route route = new Route();
            routes.add(route.toDTO(entity)); // Route 클래스에 정의된 toDTO() 메서드 사용
        }
        return routes;
    }
}
