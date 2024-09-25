package com.newbins.mapper;

import com.newbins.dto.Place;
import com.newbins.entity.MyPlaceEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PlaceMapper {
    void setMyPlace(@Param("id")String id, @Param("place")Place place);
    MyPlaceEntity getMyPlace(@Param("id")String id, @Param("placeName")String placeName);
}
