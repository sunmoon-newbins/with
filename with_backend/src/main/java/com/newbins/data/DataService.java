package com.newbins.data;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.newbins.entity.PlaceEntity;
import com.newbins.mapper.DataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DataService {

    @Autowired
    private DataMapper dataMapper;

    @Value("${api.service.key}")
    private String apiServiceKey;

    @Scheduled(cron = "0 0 0 * 1 ?")  // 매일 자정에 실행
    public void fetchAndSavePlace() {
        RestTemplate restTemplate = new RestTemplate();

        StringBuilder urlBuilder = new StringBuilder()
                .append("https://apis.data.go.kr/B551011/KorService1/searchFestival1?")
                .append("serviceKey=").append(apiServiceKey).append("&")
                .append("numOfRows=").append(2000).append("&")
                .append("pageNo=").append(1).append("&")
                .append("MobileOS=").append("ETC").append("&")
                .append("MobileApp=").append("with").append("&")
                .append("_type=json&")
                .append("listYN=Y&")
                .append("arrange=A&")
                .append("eventStartDate=").append("20170901");

        ResponseEntity<String> response = restTemplate.getForEntity(urlBuilder.toString(), String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            processAndSavePlace(response.getBody());
        } else {
            throw new RuntimeException("API 호출 실패");
        }
    }

    private void processAndSavePlace(String jsonData) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode itemsNode = objectMapper.readTree(jsonData)
                    .path("response")
                    .path("body")
                    .path("items")
                    .path("item");

            for (JsonNode item : itemsNode) {
                PlaceEntity placeEntity = new PlaceEntity();
                placeEntity.setTrrsrtNm(item.path("title").asText());   // 장소명
                placeEntity.setRdnmadr(item.path("addr1").asText());    // 도로명 주소
                placeEntity.setLnmadr(item.path("addr2").asText());     // 지번 주소
                placeEntity.setLatitude(item.path("mapx").asDouble());  // 위도
                placeEntity.setLongitude(item.path("mapy").asDouble()); // 경도
                placeEntity.setPhoneNumber(item.path("tel").asText());  // 전화번호

                dataMapper.insertPlace(placeEntity);
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("JSON 파싱 실패");
        }
    }
}
