package com.newbins.entity;

import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class NoticeEntity {
    private long notice_num;
    private String user_num;
    private String title;
    private String content;
    private int notice_type;
    private LocalDateTime notice_dt;
    private String route_num;
}
