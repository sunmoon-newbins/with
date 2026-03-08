package com.newbins.mapper;

import com.newbins.entity.RouteEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RouteLikeMapper {
    void likeRoute(@Param("routeId") String routeId, @Param("userId") String userId);
    void unlikeRoute(@Param("routeId") String routeId, @Param("userId") String userId);
    List<RouteEntity> getLikedRoutesByUserId(@Param("userId") String userId);
}
