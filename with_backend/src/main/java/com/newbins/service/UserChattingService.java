package com.newbins.service;

import com.newbins.dto.ChattingRoom;

import java.util.List;

public interface UserChattingService {
    List<ChattingRoom> getChattingRooms(String userId);
}
