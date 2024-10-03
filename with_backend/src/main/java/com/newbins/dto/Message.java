package com.newbins.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.newbins.entity.MessageEntity;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Message implements  Convertible<MessageEntity, Message> {
    private String userId;
    private String content;
    private int unreadCount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "a hh:mm")
    private LocalDateTime sendDate;

    @Override
    public Message toDTO(MessageEntity entity) {
        return this.builder()
                .userId(entity.getUser_num())
                .content(entity.getContent())
                .unreadCount(entity.getUnread_count())
                .sendDate(entity.getSend_dt())
                .build();
    }
}
