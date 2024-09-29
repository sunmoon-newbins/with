package com.newbins.service.impl;

import com.newbins.mapper.ChattingMapper;
import com.newbins.mapper.RouteMapper;
import com.newbins.service.RouteChattingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class RouteChattingServiceImpl implements RouteChattingService {

    @Autowired
    private ChattingMapper chattingMapper;

    @Override
    public void travelParticipation(String routeId, String userId) {
        try{
            String chattingId = chattingMapper.getChattingIdByRouteId(routeId);
            if(chattingId != null){
                log.info("[travelParticipation] successful getChattingIdByRouteId, chattingId = {}", chattingId);
                chattingMapper.setChattingUser(chattingId, userId);
                log.info("[travelParticipation] successful setChattingUser");
            } else {
                log.warn("[travelParticipation] failed getChattingIdByRouteId");
            }
        } catch(Exception e){
            log.error("[travelParticipation] failed travelParticipation method");
            e.printStackTrace();
        }

    }
}
