package com.newbins.entity;

import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ReviewEntity {
    private String route_num;
    private String user_num;
    private String name;
    private String profile;
    private int dalant;
    private String content;
    private LocalDateTime write_dt;
}
