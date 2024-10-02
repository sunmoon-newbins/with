package com.newbins.mapper;

import com.newbins.dto.Place;
import com.newbins.entity.MyPlaceEntity;
import com.newbins.entity.PlaceEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PlaceMapper {
    void setMyPlace(@Param("id")String id, @Param("place")Place place);
    MyPlaceEntity getMyPlace(@Param("id")String id, @Param("placeName")String placeName);
    List<MyPlaceEntity> getMyPlaces(@Param("id")String id);
    int deleteMyPlace(@Param("id")String id, @Param("placeId")long placeId);
    List<PlaceEntity> getPlaces(@Param("placeName")String placeName);
    void insertPlace(Place place);
}
