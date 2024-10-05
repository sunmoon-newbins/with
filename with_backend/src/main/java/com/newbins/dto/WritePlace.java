package com.newbins.dto;

import lombok.*;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WritePlace {
    private int order;
    private long placeNum;
    private long myPlaceNum;
    private String placeType;
    private String placeName;
    private double latitude;
    private double longitude;
    private String address;
    private String memo;
}
