package com.newbins.service;

import com.newbins.dto.Route;
import com.newbins.dto.RoutePlace;
import com.newbins.dto.WriteRoute;
import com.newbins.entity.RouteEntity;

import java.util.List;

public interface RouteService {
    void createRoute(List<WriteRoute> writeRouteList);
    Route getRoute(String routeNum);
    List<Route> getRoutes(int state, String sortType);
    List<Route> getRoutes(String userId);
    List<Route> searchRoutes(String title, String content);
    List<RoutePlace> getRoutePlace(String routeNum);
}
