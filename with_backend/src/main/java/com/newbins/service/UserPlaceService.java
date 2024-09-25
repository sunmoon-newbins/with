package com.newbins.service;

import com.newbins.dto.Place;

public interface UserPlaceService {
    void addMyPlace(String userId, Place place);
}
