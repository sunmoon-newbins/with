package com.newbins.dto;

import com.newbins.entity.NoticeEntity;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Notice implements Convertible<NoticeEntity, Notice> {
    private long noticeId;
    private String userId;
    private String title;
    private String content;
    private int type;
    private LocalDateTime noticeDate;
    private String routeId;

    @Override
    public Notice toDTO(NoticeEntity entity) {
        return this.builder()
                .noticeId(entity.getNotice_num())
                .userId(entity.getUser_num())
                .title(entity.getTitle())
                .content(entity.getContent())
                .type(entity.getNotice_type())
                .noticeDate(entity.getNotice_dt())
                .routeId(entity.getRoute_num())
                .build();
    }
}
