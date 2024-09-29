package com.newbins.controller.users;

import com.newbins.dto.Place;
import com.newbins.service.UserPlaceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/users/{user_id}/places")
public class UserPlaceController {

    @Autowired
    UserPlaceService userPlaceService;

    @GetMapping
    public List<Place> getMyPlaces(@PathVariable("user_id") String userNum) {
        log.info("[getMyPlaces] userId = {}", userNum);
        return userPlaceService.getMyPlaces(userNum);
    }
    // 나만의 장소 추가
    @PostMapping
    public Place addMyPlace(@PathVariable("user_id") String userId,
                           @RequestBody Place place){
        log.info("[addMyPlace] before addMyPlace, userId = {}", userId);
        Place myAddedPlace = userPlaceService.addMyPlace(userId, place);
        log.info("[addMyPlace] after myAddedPlace = {}", myAddedPlace);
        return myAddedPlace;

    }

    // 나만의 장소 삭제
    @DeleteMapping("/{place_id}")
    public void deleteMyPlace(@PathVariable("user_id") String userId,
                              @PathVariable("place_id") long placeId){
        userPlaceService.deleteMyPlace(userId, placeId);
    }
}
