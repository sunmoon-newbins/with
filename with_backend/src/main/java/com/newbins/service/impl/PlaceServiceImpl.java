package com.newbins.service.impl;

import com.newbins.dto.Place;
import com.newbins.dto.Route;
import com.newbins.entity.PlaceEntity;
import com.newbins.entity.RouteEntity;
import com.newbins.mapper.PlaceMapper;
import com.newbins.service.PlaceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class PlaceServiceImpl implements PlaceService {
    private final PlaceMapper placeMapper;

    public PlaceServiceImpl(PlaceMapper placeMapper) {
        this.placeMapper = placeMapper;
    }

    @Override
    public List<Place> searchPlaces(String placeName) {
        log.info("[searchPlaces] : search = {}", placeName);

        List<PlaceEntity> placeEntities = placeMapper.getPlaces(placeName);
        List<Place> places = new ArrayList<>();
        for (PlaceEntity entity : placeEntities) {
            Place place = new Place();
            places.add(place.toDTO(entity));
        }

        return places;
    }


}