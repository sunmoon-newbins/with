package com.newbins.mapper;

import com.newbins.dto.Route;
import com.newbins.entity.RouteEntity;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface RouteMapper {
    void createRoute(Route route);
    RouteEntity getRouteByRouteNum(String routeNum);

}

