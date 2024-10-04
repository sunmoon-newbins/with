package com.newbins.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.newbins.Response.PlaceResponse;
import com.newbins.dto.Place;
import com.newbins.entity.PlaceEntity;
import com.newbins.mapper.PlaceMapper;
import com.newbins.service.PlaceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class PlaceServiceImpl implements PlaceService {

    private final PlaceMapper placeMapper;

    public PlaceServiceImpl(PlaceMapper placeMapper) {
        this.placeMapper = placeMapper;
    }

    @Override
    public List<Place> searchPlaces(String placeName) {
        log.info("[searchPlaces] : search = {}", placeName);

        List<PlaceEntity> placeEntities = placeMapper.getPlaces(placeName);
        List<Place> places = new ArrayList<>();
        for (PlaceEntity entity : placeEntities) {
            Place place = new Place();
            places.add(place.toDTO(entity));
        }

        return places;
    }
    @Transactional
    @Override
    public void savePlacesFromApi() {
        int pageNum = 1;   // 첫 번째 페이지
        int pageSize = 100; // 페이지 당 결과 수 설정 (적절한 값으로 설정)
        boolean hasMoreData = true;

        try {
            while (hasMoreData) {
                // OpenAPI 호출 URL 설정 및 요청
                String response = requestApi(pageNum, pageSize); // 페이지 번호와 페이지 크기로 API 호출
                log.info("API response for page {}: {}", pageNum, response);

                // Parse the response into PlaceResponse
                PlaceResponse placeResponse = parseApiResponse(response);  // JSON 파싱
                log.info("placeResponse: {}", placeResponse);

                // Extract the items from the PlaceResponse
                if (placeResponse != null && placeResponse.getResponse().getBody() != null) {
                    List<PlaceEntity> items = placeResponse.getResponse().getBody().getItems();

                    // 데이터가 존재하면 저장
                    if (!items.isEmpty()) {
                        for (PlaceEntity place : items) {
                            log.info("Saving place: {}", place);
                            placeMapper.insertPlace(place);  // DB 저장
                        }
                        pageNum++;  // 다음 페이지로 이동
                    } else {
                        hasMoreData = false;  // 더 이상 데이터가 없으면 반복 종료
                    }
                } else {
                    hasMoreData = false;  // 응답이 유효하지 않으면 반복 종료
                }
            }
        } catch (Exception e) {
            log.error("Error in savePlacesFromApi: ", e);
        }
    }

    // API 요청 메소드
    private String requestApi(int pageNo, int numOfRows) throws IOException {
        String serviceKey = "oaE8q7DWKDPXNpMaY4UTBzyUdZHNTxEQmlO75FQ8qyMB5DMHyXZDa%2BTPmHETOWTXAuigf0cNEFO9sEvil6H15w%3D%3D";  // 오픈API에서 받은 인증키

        StringBuilder urlBuilder = new StringBuilder("http://api.data.go.kr/openapi/tn_pubr_public_trrsrt_api");
        urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(pageNo), "UTF-8")); /*페이지 번호*/
        urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode(String.valueOf(numOfRows), "UTF-8")); /*한 페이지 결과 수*/
        urlBuilder.append("&" + URLEncoder.encode("type", "UTF-8") + "=json"); /*XML/JSON 여부*/

        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        return sb.toString();  // API 응답 반환
    }

    // API 응답을 파싱하여 PlaceEntity 리스트로 변환하는 메소드
    private PlaceResponse parseApiResponse(String response) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // JSON 응답을 PlaceResponse 클래스로 파싱
            return objectMapper.readValue(response, PlaceResponse.class);
        } catch (IOException e) {
            log.error("Error parsing API response", e);
            return null;

        }
    }
}