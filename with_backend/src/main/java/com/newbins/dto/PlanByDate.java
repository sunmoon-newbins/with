package com.newbins.dto;

import lombok.*;

import java.sql.Date;
import java.util.List;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PlanByDate {
    private Date date;
    private List<WritePlace> places;
}
