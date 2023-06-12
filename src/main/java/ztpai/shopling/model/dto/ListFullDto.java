package ztpai.shopling.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ListFullDto {
    private Long id;
    private String name;
    private List<ProductDto> productDtoList;
    private LocalDate createdAt;
}
