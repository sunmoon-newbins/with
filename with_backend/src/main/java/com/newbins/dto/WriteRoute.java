package com.newbins.dto;

import lombok.*;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WriteRoute {
    private String picture;
    private String title;
    private String content;
    private byte routeType;
    private int participantCount;
    private PlanByDate planByDate;
}
