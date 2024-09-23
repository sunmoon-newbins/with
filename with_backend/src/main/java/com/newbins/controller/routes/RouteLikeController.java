package com.newbins.controller.routes;

import com.newbins.dto.request.UserRequestDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/routes/{route_id}/like")
public class RouteLikeController {

    // 루트 좋아요
    @PostMapping
    public void likeRoute(@PathVariable("route_id") String routeId,
                          @RequestBody UserRequestDTO userRequest){

    }


}
