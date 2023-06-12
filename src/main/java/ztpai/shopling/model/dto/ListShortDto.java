package ztpai.shopling.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
public class ListShortDto {
    private Long id;
    private String name;
    private LocalDate createdAt;
    private Integer productListSize;
}
