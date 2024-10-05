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
    private String placeType;
    private String placeName;
    private double latitude;
    private double longitude;
    private String addressName;
    private String memo;
}
