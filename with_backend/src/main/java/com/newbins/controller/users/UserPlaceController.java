package com.newbins.controller.users;

import com.newbins.dto.Place;
import com.newbins.service.UserPlaceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/users/{user_id}/places")
public class UserPlaceController {

    @Autowired
    UserPlaceService userPlaceService;

    @GetMapping
    public void test(@PathVariable("user_id") String userId){
        System.out.println(userId);
    }

    // 나만의 장소 추가
    @PostMapping
    public void addMyPlace(@PathVariable("user_id") String userId,
                           @RequestBody Place place){
        log.info("[addMyPlace] before addMyPlace, userId = {}", userId);
        userPlaceService.addMyPlace(userId, place);
    }
}
