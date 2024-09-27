package com.newbins.entity;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ChattingRoomEntity {
    private String chatting_num;
    private String route_num;
    private String title;
    private int participant_count;
    private int current_user_count;
    private byte state;
    private String picture;
    private String name;
    private String content;
}
