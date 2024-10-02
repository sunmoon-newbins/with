package com.newbins.entity;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class RoutePlaceEntity {
    private LocalDate route_date;
    private int place_sequence;
    private String route_num;
    private String place_num;
    private long my_place_num;
    private String memo;
}
