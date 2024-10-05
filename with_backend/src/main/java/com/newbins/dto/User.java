package com.newbins.dto;

import com.newbins.entity.UsersEntity;
import lombok.*;
import java.sql.Date;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User implements Convertible<UsersEntity, User> {
    private String userId;
    private String id;
    private String password;
    private String name;
    private String birth;
    private String profile;
    private String country;
    private String nickname;
    private String language;
    private Date createDate;
    private double avgDalant;

    @Override
    public User toDTO(UsersEntity entity) {
        return this.builder()
                .userId(entity.getUser_num())
                .id(entity.getId())
                .name(entity.getName())
                .birth(entity.getBirth())
                .profile(entity.getProfile())
                .country(entity.getCountry())
                .nickname(entity.getNickname())
                .language(entity.getLanguages())
                .createDate(entity.getCreate_date())
                .avgDalant(entity.getAvg_dalant())
                .build();
    }
}
