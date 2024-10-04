package com.newbins.dto;

import com.newbins.entity.RouteEntity;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Route implements Convertible<RouteEntity, Route>{
    private String routeNum;        // 경로 식별 번호
    private String author;        // 경로 작성자 이름
    private String userProfile;     // 경로 작성자 프로필
    private String title;           // 경로 제목
    private int state;              // 경로 상태
    private int participantCount;   // 총 참가자 수
    private int currentMember;      // 현재 참가자 수
    private String picture;         // 루트 대표 사진
    private LocalDateTime createDate; // 생성 날짜
    private LocalDateTime startDate;  // 시작 날짜
    private LocalDateTime endDate;    // 종료 날짜
    private String content;

    @Override
    public Route toDTO(RouteEntity entity) {
        Route route = new Route();
        return route.builder()
                .routeNum(entity.getRoute_num())
                .author(entity.getName())
                .userProfile(entity.getProfile())
                .title(entity.getTitle())
                .state(entity.getState())
                .participantCount(entity.getParticipant_count())
                .currentMember(entity.getCurrent_user_count())
                .picture(entity.getPicture())
                .createDate(entity.getCreate_date())
                .startDate(entity.getStart_date())
                .endDate(entity.getEnd_date())
                .content(entity.getContent())
                .build();
    }

    // List에 담겨있는 RouteEntity를 Route로 변환하여 List로 반환
    public List<Route> toDTO(List<RouteEntity> entities) {
        // RouteEntity를 Route로 변환하여 List로 반환
        List<Route> routes = new ArrayList<>();
        for (RouteEntity entity : entities) {
            Route route = new Route();
            routes.add(route.toDTO(entity)); // Route 클래스에 정의된 toDTO() 메서드 사용
        }

        return routes;
    }

}
