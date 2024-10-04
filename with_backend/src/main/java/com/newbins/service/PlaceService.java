package com.newbins.service;

import com.newbins.dto.Place;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PlaceService {
    public List<Place> searchPlaces(String placeName);
    public void savePlacesFromApi();
}
