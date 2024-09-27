package com.newbins.dto;

import com.newbins.entity.ChattingRoomEntity;
import lombok.*;

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
    private String picture;
    private String userName;
    private String content;


    @Override
    public ChattingRoom toDTO(ChattingRoomEntity entity) {
        return this.builder()
                .chattingRoomId(entity.getChatting_num())
                .routeId(entity.getRoute_num())
                .title(entity.getTitle())
                .participantCount(entity.getParticipant_count())
                .currentUserCount(entity.getCurrent_user_count())
                .state(entity.getState())
                .picture(entity.getPicture())
                .userName(entity.getName())
                .content(entity.getContent())
                .build();
    }
}
