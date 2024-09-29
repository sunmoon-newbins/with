package com.newbins.dto;

import com.newbins.entity.ReviewEntity;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Review implements Convertible<ReviewEntity, Review>{
    private String routeId;
    private String userId;
    private String name;
    private String profile;
    private int dalant;
    private String content;
    private LocalDateTime writeDate;

    @Override
    public Review toDTO(ReviewEntity entity) {
        return this.builder()
                .routeId(entity.getRoute_num())
                .userId(entity.getUser_num())
                .name(entity.getName())
                .profile(entity.getProfile())
                .dalant(entity.getDalant())
                .content(entity.getContent())
                .writeDate(entity.getWrite_dt())
                .build();
    }
}
