package com.newbins.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Chatting {
    private String routeId;
    private String writerName;
    private String picture;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM.dd")
    private LocalDateTime startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM.dd")
    private LocalDateTime endDate;
    private List<User> users;
    private List<Message> messages;
}
