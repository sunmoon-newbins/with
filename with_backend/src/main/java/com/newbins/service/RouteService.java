package com.newbins.service;

import com.newbins.dto.Route;
import com.newbins.entity.RouteEntity;

public interface RouteService {
    void createRoute(Route toute);
    Route getRouteByRouteNum(String routeNum);
}
