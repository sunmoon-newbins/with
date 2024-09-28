package com.newbins.entity;

import lombok.*;

import java.sql.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MessageEntity {
    private long message_num;
    private String chatting_num;
    private String user_num;
    private String content;
    private int unread_count;
    private Date send_dt;
}
