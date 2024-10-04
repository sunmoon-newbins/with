package com.newbins.service;

import com.newbins.dto.MyPlace;
import com.newbins.dto.Place;

import java.util.List;

public interface UserPlaceService {
    MyPlace addMyPlace(String userId, Place place);
    void deleteMyPlace(String userId, long placeId);
    List<Place> getMyPlaces(String userNum);
}
