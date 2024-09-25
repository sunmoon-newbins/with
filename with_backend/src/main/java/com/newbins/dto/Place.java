package com.newbins.dto;

import com.newbins.entity.MyPlaceEntity;
import com.newbins.entity.PlaceEntity;
import lombok.*;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Place implements Convertible<PlaceEntity, Place> {
    private String placeNum;    // 장소 번호
    private String placeName;   // 관광지명, 장소명
    private byte placeType;     // 관광지 구분
    private String roadAddress; // 소재지도록명주소
    private String address;     // 소재지지번주소
    private double latitude;    // 위도
    private double longitude;   // 경도
    private double area;        // 면적
    private String introduction;// 관광지 소개
    private String phoneNumber; // 관리기관전화번호
    private String management;  // 관리기관명

    @Override
    public Place toDTO(PlaceEntity entity) {
        return this.builder()
                .placeNum(entity.getPlace_num())
                .placeName(entity.getTrrsrtNm())
                .placeType(entity.getTrrsrtSe())
                .roadAddress(entity.getRdnmadr())
                .address(entity.getLnmadr())
                .latitude(entity.getLatitude())
                .longitude(entity.getLongitude())
                .area(entity.getAr())
                .introduction(entity.getTrrsrtIntrcn())
                .phoneNumber(entity.getPhoneNumber())
                .management(entity.getInstitutionNm())
                .build();
    }
}
