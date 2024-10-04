package com.newbins.controller.places;

import com.newbins.dto.Place;
import com.newbins.service.PlaceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/places")
public class PlaceController {

    @Autowired
    PlaceService placeService;

    // openAPI 가져오는 기능
    @GetMapping("/savePlaces")
    public void savePlaces(){
        placeService.savePlacesFromApi();
        log.info("[savePlaces] : Data saved successfully");
    }

    // 장소 검색
    @GetMapping("/search")
    public List<Place> searchPlaces(@RequestParam(required = false) String placeName){
        log.info("[searchPlaces] : placeName = {}", placeName);

        return placeService.searchPlaces(placeName);
    }


}
