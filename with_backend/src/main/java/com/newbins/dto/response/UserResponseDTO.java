package com.newbins.dto.response;

import lombok.*;

import java.sql.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UserResponseDTO {
    private String userId;
    private String id;
    private String password;
    private String name;
    private String birth;
    private byte country;
    private String nickname;
    private byte language;
    private Date createDate;
}