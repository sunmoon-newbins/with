package com.newbins.service;

import com.newbins.dto.Place;

public interface UserPlaceService {
    Place addMyPlace(String userId, Place place);
    void deleteMyPlace(String userId, long placeId);
}
