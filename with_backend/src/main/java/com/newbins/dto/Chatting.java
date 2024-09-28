package com.newbins.dto;

import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Chatting {
    private List<User> users;
    private List<Message> messages;
}
