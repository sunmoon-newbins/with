package com.newbins.dto;

import lombok.*;
import java.sql.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class User {
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

    @Override
    public String toString() {
        return "User{" +
                "userId='" + userId + '\'' +
                ", id='" + id + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", birth='" + birth + '\'' +
                ", profile='" + profile + '\'' +
                ", country=" + country +
                ", nickname='" + nickname + '\'' +
                ", language=" + language +
                ", createDate=" + createDate +
                '}';
    }
}
