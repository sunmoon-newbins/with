package com.newbins.service;

import com.newbins.dto.Place;

import java.util.List;

public interface UserPlaceService {
    Place addMyPlace(String userId, Place place);
    void deleteMyPlace(String userId, long placeId);
    List<Place> getMyPlaces(String userNum);
}
