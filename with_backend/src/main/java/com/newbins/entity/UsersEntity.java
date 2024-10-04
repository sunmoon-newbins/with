package com.newbins.entity;

import lombok.*;

import java.sql.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UsersEntity {
    private String user_num;
    private String id;
    private String password;
    private String name;
    private String birth;
    private String profile;
    private String country;
    private String nickname;
    private String languages;
    private Date create_date;
    private double avg_dalant;
}
