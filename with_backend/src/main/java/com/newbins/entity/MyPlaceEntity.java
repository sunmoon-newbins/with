package com.newbins.entity;

import lombok.*;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MyPlaceEntity {
    private long place_num;     // 장소 번호
    private String user_num;    // 회원 번호
    private String place_name;  // 장소명
    private byte place_type;    // 장소 타입
    private String road_address;// 도로명주소
    private String address;     // 주소
    private double latitude;    // 위도
    private double longitude;   // 경도
    private Date create_date;   // 생성 날짜
}
