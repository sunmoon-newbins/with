package com.newbins.mapper;

import com.newbins.dto.Route;
import com.newbins.entity.RouteEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface RouteMapper {
    void createRoute(Route route);
    RouteEntity getRoute(String routeNum);
    List<RouteEntity> getRoutes(@Param("state") int state, @Param("sortType") String sortType);
    List<RouteEntity> searchRoutes(@Param("title") String title, @Param("content") String content);
}

