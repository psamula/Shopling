package ztpai.shopling.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ztpai.shopling.model.dto.*;
import ztpai.shopling.service.ShoppingListService;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("api/")
public class ShoppingListController {
    private final ShoppingListService shoppingListService;
    @GetMapping("/{listId}")
    public ListFullDto getShoppingList(@PathVariable Long listId) {
        return shoppingListService.getShoppingList(listId);
    }
    @PutMapping("/")
    public ListFullDto editShoppingList(@RequestBody ListFullDto listFullDto) {
        return shoppingListService.editShoppingList(listFullDto);
    }
    @DeleteMapping("/{listId}")
    public void deleteShoppingList(@PathVariable Long listId) {
        shoppingListService.deleteShoppingList(listId);
    }
    @GetMapping("/")
    public List<ListShortDto> getShoppingLists() {
        return shoppingListService.getShoppingLists();
    }
    @PutMapping("/products")
    public void takeAProduct(@RequestBody CheckboxDto checkboxDto) {
        this.shoppingListService.takeAProduct(checkboxDto);
    }

    @PostMapping("/create")
    public ListFullDto createShoppingList(@RequestBody ShoppingListCreationDto shoppingListCreationDto) {
        return shoppingListService.createShoppingList(shoppingListCreationDto);
    }

    @GetMapping("/secured-hello")
    public String securedHello() {
        return "hello";
    }
    @PostMapping("/products")
    public ProductDto addProduct(@RequestBody ProductCreationDto productCreationDto) {
        return this.shoppingListService.addProduct(productCreationDto);
    }
    @DeleteMapping("/products/{productId}")
    public void deleteProduct(@PathVariable Long productId) {
        this.shoppingListService.deleteProduct(productId);
    }
    @PostMapping("/{listId}/clear-taken")
    public void clearTakenOfList(@PathVariable Long listId) {
        this.shoppingListService.clearTakenOfList(listId);
    }
}
