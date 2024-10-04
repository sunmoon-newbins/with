package com.newbins.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.*;

import java.sql.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class PlaceEntity {
    private String place_num;
    private String trrsrtNm;        // 장소명
    private String trrsrtSe;          // 장소 구분
    private String rdnmadr;         // 소재지도로명주소
    private String lnmadr;          // 소재지지번주소
    private double latitude;        // 위도
    private double longitude;       // 경도
    private double ar;              // 면적
    private String cnvnncFclty;     // 공공편익시설정보
    private String stayngInfo;      // 숙박시설정보

    private String mvmAmsmtFclty;   // 운동및오락시설정보
    private String recrtClturFclty; // 휴양및문화시설정보
    private String hospitalityFclty;// 접객시설정보
    private String sportFclty;      // 지원시설정보
    private Date appnDate;          // 지정일자
    private int aceptncCo;          // 수용인원수
    private int prkplceCo;          // 주차가능수
    private String trrsrtIntrcn;    // 관광지소개
    private String phoneNumber;     // 관리기관전화번호
    private String institutionNm;   // 관리기관명
    private String referenceDate;   // 데이터기준일자
    private String insttCode;      // 제공기관코드

}
