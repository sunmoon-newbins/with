package com.newbins.mapper;

import com.newbins.dto.WriteRoute;
import com.newbins.entity.RouteEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


@Mapper
public interface RouteMapper {
    void createRoute(
            @Param("userId") String userId,
            @Param("writeRoute") WriteRoute writeRoute,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate);
    RouteEntity getRouteByRouteNum(String routeNum);
    List<RouteEntity> getRoutes(@Param("state") int state, @Param("sortType") String sortType);
    List<RouteEntity> getRouteByUserNum(@Param("userId") String userId);
    List<RouteEntity> searchRoutes(@Param("title") String title, @Param("content") String content);

    String getlatestRouteNumByUserNum(String userId);
}

