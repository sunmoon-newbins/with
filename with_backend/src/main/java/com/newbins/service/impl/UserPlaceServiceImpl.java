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
    private PlaceMapper placeMapper;

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

    @Override
    public void deleteMyPlace(String userId, long placeId) {
        try{
            int deletedCount = placeMapper.deleteMyPlace(userId, placeId);
            if(deletedCount > 0){
                log.info("[deleteMyPlace] successfully deleted my place");
            } else {
                log.warn("[deleteMyPlace] No place found to delete");
            }
        } catch(Exception e){
            log.error("[deleteMyPlace] failed delete my place");
        }
    }
}
