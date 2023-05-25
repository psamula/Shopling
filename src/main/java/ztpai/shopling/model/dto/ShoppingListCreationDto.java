package ztpai.shopling.model.dto;

import lombok.Getter;
import lombok.Setter;


import java.util.List;

@Getter
@Setter
public class ShoppingListCreationDto {
    private String name;
    private List<ProductDto> productList;
}
