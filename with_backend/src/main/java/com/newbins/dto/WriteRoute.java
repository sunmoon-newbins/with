package com.newbins.dto;

import lombok.*;

import java.util.LinkedList;
import java.util.List;

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
    private String profile;
    private String name;
    private int participantCount;
    private int currentMember;
    private byte routeType;
    private double avgDalant;
    private int authorRouteCount;
    private LinkedList<PlanByDate> planByDate;
}
