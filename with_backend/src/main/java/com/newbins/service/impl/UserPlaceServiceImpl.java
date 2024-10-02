package com.newbins.service.impl;

import com.newbins.dto.Place;
import com.newbins.dto.Route;
import com.newbins.entity.MyPlaceEntity;
import com.newbins.entity.PlaceEntity;
import com.newbins.entity.RouteEntity;
import com.newbins.mapper.PlaceMapper;
import com.newbins.mapper.UserMapper;
import com.newbins.service.UserPlaceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
//        return new Place().toDTO(placeMapper.getMyPlace(userId, place.getPlaceName()));
        return null;
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

    @Override
    public List<Place> getMyPlaces(String userId) {
        log.info("[getMyPlaces] userId = {}", userId);

        //entity를 dto로 바꾸는
        List<MyPlaceEntity> myPlaceEntities = placeMapper.getMyPlaces(userId);

        // RouteEntity를 Route로 변환하여 List로 반환
        List<Place> myPlaces = new ArrayList<>();
//        for (MyPlaceEntity entity : myPlaceEntities) {
//            Place myPlace = new Place();
//            myPlaces.add(myPlace.toDTO(entity)); // Route 클래스에 정의된 toDTO() 메서드 사용
//        }
        return myPlaces;
    }
}
