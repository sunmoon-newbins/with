package com.newbins.controller.places;

import com.newbins.dto.Place;
import com.newbins.service.PlaceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/places")
public class PlaceController {

    @Autowired
    PlaceService placeService;

    // 장소 추가 눌렀을 때
    @GetMapping
    public void getPlaces(){

    }

    // 장소 검색
    @GetMapping("/search")
    public List<Place> searchPlaces(@RequestParam(required = false) String placeName){
        return placeService.searchPlaces(placeName);
    }

}
