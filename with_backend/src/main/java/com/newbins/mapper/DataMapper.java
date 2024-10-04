package com.newbins.mapper;

import com.newbins.entity.PlaceEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DataMapper {
    void insertPlace(PlaceEntity placeEntity);
}
