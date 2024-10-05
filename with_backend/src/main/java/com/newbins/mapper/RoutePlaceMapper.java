package com.newbins.mapper;

import com.newbins.dto.PlanByDate;
import com.newbins.dto.RoutePlace;
import com.newbins.entity.RoutePlaceEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.LinkedList;
import java.util.List;

@Mapper
public interface RoutePlaceMapper {
    List<RoutePlaceEntity> getRoutePlaceByRouteNum(@Param("routeNum") String routeNum);

    void setRoutePlace(String routeNum, LinkedList<PlanByDate> planByDate);
}
