package com.newbins.mapper;

import com.newbins.dto.Place;
import com.newbins.entity.MyPlaceEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PlaceMapper {
    void setMyPlace(@Param("userId")String userId, @Param("place")Place place);
    MyPlaceEntity getMyPlace(@Param("userId")String userId, @Param("placeName")String placeName);
    int deleteMyPlace(@Param("userId")String userId, @Param("placeId")long placeId);
}
