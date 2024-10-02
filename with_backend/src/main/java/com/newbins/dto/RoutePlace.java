package com.newbins.dto;

import com.newbins.entity.RoutePlaceEntity;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class RoutePlace implements Convertible<RoutePlaceEntity, RoutePlace>{

    private LocalDate routeDate;
    private int placeSequence;
    private String routeNum;
    private String placeNum;
    private long myPlaceNum;
    private String memo;

    @Override
    public String toString() {
        return "RoutePlaces{" +
                "routeDate=" + routeDate +
                ", placeSequence=" + placeSequence +
                ", routeNum='" + routeNum + '\'' +
                ", placeNum='" + placeNum + '\'' +
                ", myPlaceNum=" + myPlaceNum +
                ", memo='" + memo + '\'' +
                '}';
    }

    @Override
    public RoutePlace toDTO(RoutePlaceEntity entity) {
        RoutePlace routePlace = new RoutePlace();
        return routePlace.builder()
                .routeDate(entity.getRoute_date())
                .placeSequence(entity.getPlace_sequence())
                .routeNum(entity.getRoute_num())
                .placeNum(entity.getPlace_num())
                .myPlaceNum(entity.getMy_place_num())
                .memo(entity.getMemo())
                .build();
    }

    // List에 담겨있는 RouteEntity를 Route로 변환하여 List로 반환
    public List<RoutePlace> toDTO(List<RoutePlaceEntity> entities) {
        // RouteEntity를 Route로 변환하여 List로 반환
        List<RoutePlace> routePlaces = new ArrayList<>();
        for (RoutePlaceEntity entity : entities) {
            RoutePlace routePlace = new RoutePlace();
            routePlaces.add(routePlace.toDTO(entity)); // Route 클래스에 정의된 toDTO() 메서드 사용
        }
        return routePlaces;
    }
}
