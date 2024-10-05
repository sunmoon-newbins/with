package com.newbins.dto;

import lombok.*;

import java.sql.Date;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PlanByDate {
    private Date date;
    private WritePlace places;
}
