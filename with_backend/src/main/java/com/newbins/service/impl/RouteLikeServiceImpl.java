package com.newbins.service.impl;

import com.newbins.dto.Route;
import com.newbins.entity.RouteEntity;
import com.newbins.mapper.RouteLikeMapper;
import com.newbins.service.RouteLikeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class RouteLikeServiceImpl implements RouteLikeService {

    @Autowired
    private RouteLikeMapper routeLikeMapper;

    @Override
    public void likeRoute(String routeId, String userId) {
        try {
            routeLikeMapper.likeRoute(routeId, userId);
            log.info("[likeRoute] successful like route, routeId = {}, userId = {}", routeId, userId);
        } catch (Exception e) {
            log.error("[likeRoute] failed like route", e);
        }
    }

    @Override
    public void unlikeRoute(String routeId, String userId) {
        try {
            routeLikeMapper.unlikeRoute(routeId, userId);
            log.info("[unlikeRoute] successful unlike route, routeId = {}, userId = {}", routeId, userId);
        } catch (Exception e) {
            log.error("[unlikeRoute] failed unlike route", e);
        }
    }

    @Override
    public List<Route> getLikedRoutes(String userId) {
        List<Route> routes = new ArrayList<>();
        try {
            List<RouteEntity> routeEntities = routeLikeMapper.getLikedRoutesByUserId(userId);
            log.info("[getLikedRoutes] successful getLikedRoutes, userId = {}", userId);
            for (RouteEntity entity : routeEntities) {
                routes.add(new Route().toDTO(entity));
            }
        } catch (Exception e) {
            log.error("[getLikedRoutes] failed getLikedRoutes", e);
        }
        return routes;
    }
}
