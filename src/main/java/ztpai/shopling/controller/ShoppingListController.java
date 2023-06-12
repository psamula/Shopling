package ztpai.shopling.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ztpai.shopling.model.dto.ListFullDto;
import ztpai.shopling.model.dto.ListShortDto;
import ztpai.shopling.model.dto.ShoppingListCreationDto;
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
    @PostMapping("/create")
    public ListFullDto createShoppingList(@RequestBody ShoppingListCreationDto shoppingListCreationDto) {
        return shoppingListService.createShoppingList(shoppingListCreationDto);
    }

    @GetMapping("/secured-hello")
    public String securedHello() {
        return "hello";
    }

}
