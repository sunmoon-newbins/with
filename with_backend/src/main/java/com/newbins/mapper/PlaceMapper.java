package com.newbins.mapper;

import com.newbins.dto.Place;
import com.newbins.entity.MyPlaceEntity;
import com.newbins.entity.PlaceEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PlaceMapper {
    void setMyPlace(@Param("userId")String userId, @Param("place")Place place);
    MyPlaceEntity getMyPlace(@Param("userId")String userId, @Param("placeName")String placeName);
    List<MyPlaceEntity> getMyPlaces(@Param("userId")String userId);
    int deleteMyPlace(@Param("userId")String userId, @Param("placeId")long placeId);
    List<PlaceEntity> getPlaces(@Param("placeName")String placeName);
    void insertPlace(PlaceEntity placeEntity);
}
