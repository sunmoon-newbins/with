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
public class Place implements Convertible<PlaceEntity, Place> {
    private long placeNum;    // 장소 번호
    private String placeName;   // 관광지명, 장소명
    private String placeType;     // 관광지 구분
    private String roadAddress; // 소재지도록명주소
    private String address;     // 소재지지번주소
    private double latitude;    // 위도
    private double longitude;   // 경도
    private double area;        // 면적
    private String introduction;// 관광지 소개
    private String phoneNumber; // 관리기관전화번호
    private String management;  // 관리기관명
    private Date appnDate;      // 지정일자
    private int aceptncCo;      // 수용 인원수
    private int prkplceCo;      // 주차 가능수
    private String cnvnncFclty; // 공공편익시설정보
    private String stayngInfo;  // 숙박시설정보
    private String mvmAmsmtFclty; // 운동 및 오락시설정보
    private String recrtClturFclty; // 휴양 및 문화시설정보
    private String hospitalityFclty; // 접객시설정보
    private String sportFclty; // 지원시설정보

    @Override
    public Place toDTO(PlaceEntity entity) {
        return this.builder()
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
                .appnDate(entity.getAppnDate())
                .aceptncCo(entity.getAceptncCo())
                .prkplceCo(entity.getPrkplceCo())
                .build();
    }

}
