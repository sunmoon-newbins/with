package com.newbins.service.impl;

import com.newbins.dto.Place;
import com.newbins.entity.PlaceEntity;
import com.newbins.mapper.PlaceMapper;
import com.newbins.mapper.UserMapper;
import com.newbins.service.UserPlaceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserPlaceServiceImpl implements UserPlaceService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    PlaceMapper placeMapper;

    @Override
    public Place addMyPlace(String userId, Place place) {
        try{
            placeMapper.setMyPlace(userId, place);
            log.info("[addMyPlace] add MyPlace successfull");
        } catch(Exception e){
            log.error("[addMyPlace] add MyPlace failed, error = {}", e);
        }
        return new Place().toDTO(placeMapper.getMyPlace(userId, place.getPlaceName()));
    }
}
