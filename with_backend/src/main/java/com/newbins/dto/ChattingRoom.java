package com.newbins.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.newbins.entity.ChattingRoomEntity;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ChattingRoom implements Convertible<ChattingRoomEntity, ChattingRoom>{
    private String chattingRoomId;
    private String routeId;
    private String title;
    private int participantCount;
    private int currentUserCount;
    private byte state;
    private String profile;
    private String userName;
    private String content;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "a hh:mm")
    private LocalDateTime sendDate;


    @Override
    public ChattingRoom toDTO(ChattingRoomEntity entity) {
        return this.builder()
                .chattingRoomId(entity.getChatting_num())
                .routeId(entity.getRoute_num())
                .title(entity.getTitle())
                .participantCount(entity.getParticipant_count())
                .currentUserCount(entity.getCurrent_user_count())
                .state(entity.getState())
                .profile(entity.getProfile())
                .userName(entity.getName())
                .content(entity.getContent())
                .sendDate(entity.getSend_dt())
                .build();
    }
}
