package com.newbins.Response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.newbins.entity.PlaceEntity;
import java.util.Date;
import java.util.List;

public class PlaceResponse {

    @JsonProperty("response")
    private ResponseWrapper response;

    // Getter and Setter for ResponseWrapper
    public ResponseWrapper getResponse() {
        return response;
    }

    public void setResponse(ResponseWrapper response) {
        this.response = response;
    }

    // Nested static class for ResponseWrapper
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ResponseWrapper {
        @JsonProperty("body")
        private Body body;

        public Body getBody() {
            return body;
        }

        public void setBody(Body body) {
            this.body = body;
        }
    }

    // Nested static class for Body
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Body {
        @JsonProperty("items")
        private List<PlaceEntity> items;

        public List<PlaceEntity> getItems() {
            return items;
        }

        public void setItems(List<PlaceEntity> items) {
            this.items = items;
        }
    }

    // Fields from API Response
    @JsonProperty("trrsrtNm")   // 장소명
    private String trrsrtNm;

    @JsonProperty("trrsrtSe")   // 장소 구분
    private String trrsrtSe;

    @JsonProperty("rdnmadr")    // 소재지 도로명 주소
    private String rdnmadr;

    @JsonProperty("lnmadr")     // 소재지 지번 주소
    private String lnmadr;

    @JsonProperty("latitude")   // 위도
    private double latitude;

    @JsonProperty("longitude")  // 경도
    private double longitude;

    @JsonProperty("ar")         // 면적
    private double ar;

    @JsonProperty("cnvnncFclty")   // 공공편익시설 정보
    private String cnvnncFclty;

    @JsonProperty("stayngInfo")    // 숙박시설 정보
    private String stayngInfo;

    @JsonProperty("mvmAmsmtFclty") // 운동 및 오락시설 정보
    private String mvmAmsmtFclty;

    @JsonProperty("recrtClturFclty")  // 휴양 및 문화시설 정보
    private String recrtClturFclty;

    @JsonProperty("hospitalityFclty") // 접객시설 정보
    private String hospitalityFclty;

    @JsonProperty("sportFclty")    // 지원시설 정보
    private String sportFclty;

    @JsonProperty("appn_date")     // 지정일자
    private Date appnDate;

    @JsonProperty("aceptncCo")     // 수용인원수
    private int aceptncCo;

    @JsonProperty("prkplceCo")     // 주차가능수
    private int prkplceCo;

    @JsonProperty("trrsrtIntrcn")  // 관광지 소개
    private String trrsrtIntrcn;

    @JsonProperty("phoneNumber")   // 관리기관 전화번호
    private String phoneNumber;

    @JsonProperty("institutionNm") // 관리기관명
    private String institutionNm;

    @JsonProperty("referenceDate") // 데이터 기준일자
    private String referenceDate;

    @JsonProperty("instt_code")    // 제공기관 코드
    private String insttCode;

    // Getters and Setters for API response fields
    public String getTrrsrtNm() { return trrsrtNm; }
    public void setTrrsrtNm(String trrsrtNm) { this.trrsrtNm = trrsrtNm; }

    public String getTrrsrtSe() { return trrsrtSe; }
    public void setTrrsrtSe(String trrsrtSe) { this.trrsrtSe = trrsrtSe; }

    public String getRdnmadr() { return rdnmadr; }
    public void setRdnmadr(String rdnmadr) { this.rdnmadr = rdnmadr; }

    public String getLnmadr() { return lnmadr; }
    public void setLnmadr(String lnmadr) { this.lnmadr = lnmadr; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public double getAr() { return ar; }
    public void setAr(double ar) { this.ar = ar; }

    public String getCnvnncFclty() { return cnvnncFclty; }
    public void setCnvnncFclty(String cnvnncFclty) { this.cnvnncFclty = cnvnncFclty; }

    public String getStayngInfo() { return stayngInfo; }
    public void setStayngInfo(String stayngInfo) { this.stayngInfo = stayngInfo; }

    public String getMvmAmsmtFclty() { return mvmAmsmtFclty; }
    public void setMvmAmsmtFclty(String mvmAmsmtFclty) { this.mvmAmsmtFclty = mvmAmsmtFclty; }

    public String getRecrtClturFclty() { return recrtClturFclty; }
    public void setRecrtClturFclty(String recrtClturFclty) { this.recrtClturFclty = recrtClturFclty; }

    public String getHospitalityFclty() { return hospitalityFclty; }
    public void setHospitalityFclty(String hospitalityFclty) { this.hospitalityFclty = hospitalityFclty; }

    public String getSportFclty() { return sportFclty; }
    public void setSportFclty(String sportFclty) { this.sportFclty = sportFclty; }

    public Date getAppnDate() { return appnDate; }
    public void setAppnDate(Date appnDate) { this.appnDate = appnDate; }

    public int getAceptncCo() { return aceptncCo; }
    public void setAceptncCo(int aceptncCo) { this.aceptncCo = aceptncCo; }

    public int getPrkplceCo() { return prkplceCo; }
    public void setPrkplceCo(int prkplceCo) { this.prkplceCo = prkplceCo; }

    public String getTrrsrtIntrcn() { return trrsrtIntrcn; }
    public void setTrrsrtIntrcn(String trrsrtIntrcn) { this.trrsrtIntrcn = trrsrtIntrcn; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getInstitutionNm() { return institutionNm; }
    public void setInstitutionNm(String institutionNm) { this.institutionNm = institutionNm; }

    public String getReferenceDate() { return referenceDate; }
    public void setReferenceDate(String referenceDate) { this.referenceDate = referenceDate; }

    public String getInsttCode() { return insttCode; }
    public void setInsttCode(String insttCode) { this.insttCode = insttCode; }

    // Converts PlaceResponse to PlaceEntity
    public PlaceEntity toEntity() {
        PlaceEntity entity = new PlaceEntity();
        entity.setTrrsrtNm(this.trrsrtNm);
        entity.setTrrsrtSe(String.valueOf(this.trrsrtSe));
        entity.setRdnmadr(this.rdnmadr);
        entity.setLnmadr(this.lnmadr);
        entity.setLatitude(this.latitude);
        entity.setLongitude(this.longitude);
        entity.setAr(this.ar);
        entity.setCnvnncFclty(this.cnvnncFclty);
        entity.setStayngInfo(this.stayngInfo);
        entity.setMvmAmsmtFclty(this.mvmAmsmtFclty);
        entity.setRecrtClturFclty(this.recrtClturFclty);
        entity.setHospitalityFclty(this.hospitalityFclty);
        entity.setSportFclty(this.sportFclty);
        entity.setAppnDate((java.sql.Date) this.appnDate);
        entity.setAceptncCo(this.aceptncCo);
        entity.setPrkplceCo(this.prkplceCo);
        entity.setTrrsrtIntrcn(this.trrsrtIntrcn);
        entity.setPhoneNumber(this.phoneNumber);
        entity.setInstitutionNm(this.institutionNm);
        entity.setReferenceDate(this.referenceDate);
        entity.setInsttCode(this.insttCode);
        return entity;
    }
}
