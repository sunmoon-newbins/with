package com.newbins.dto;

import com.newbins.entity.MyPlaceEntity;
import com.newbins.entity.PlaceEntity;
import lombok.*;

import java.sql.Date;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MyPlace implements Convertible<MyPlaceEntity, MyPlace>{
    private long placeNum;     // 장소 번호
    private String userNum;    // 회원 번호
    private String placeName;  // 장소명
    private byte placeType;    // 장소 타입
    private String roadAddress;// 도로명주소
    private String address;     // 주소
    private double latitude;    // 위도
    private double longitude;   // 경도
    private Date createDate;   // 생성 날짜

    public MyPlace toDTO(MyPlaceEntity entity) {
        return this.builder()
                .placeNum(entity.getPlace_num())
                .placeName(entity.getPlace_name())
                .placeType(entity.getPlace_type())
                .roadAddress(entity.getRoad_address())
                .address(entity.getAddress())
                .latitude(entity.getLatitude())
                .longitude(entity.getLongitude())
                .createDate(entity.getCreate_date())
                .build();
    }

}
