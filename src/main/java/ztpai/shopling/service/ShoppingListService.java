package ztpai.shopling.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ztpai.shopling.model.ProductEntity;
import ztpai.shopling.model.ShoppingListEntity;
import ztpai.shopling.model.UserEntity;
import ztpai.shopling.model.dto.*;
import ztpai.shopling.repository.ProductRepository;
import ztpai.shopling.repository.ShoppingListRepository;

import javax.persistence.Entity;
import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ShoppingListService {
    private final ShoppingListRepository shoppingListRepository;
    private final ProductRepository productRepository;
    private final UserService userService;
    private ListShortDto convertToListShortDto(ShoppingListEntity shoppingListEntity) {
        ListShortDto shortListDto = new ListShortDto();
        shortListDto.setId(shoppingListEntity.getId());
        shortListDto.setName(shoppingListEntity.getName());
        shortListDto.setProductListSize(shoppingListEntity.getProducts().size());
        shortListDto.setCreatedAt(shoppingListEntity.getCreatedAt());
        shortListDto.setNumberOfTakenProducts(countAllTakenOfList(shoppingListEntity));

        return shortListDto;
    }
    private ListFullDto convertToListFullDto(ShoppingListEntity shoppingListEntity) {
        ListFullDto listFullDto = new ListFullDto();
        if (shoppingListEntity.getProducts() == null) {
            shoppingListEntity.setProducts(new ArrayList<>());
        }
        List<ProductDto> productDtoList = shoppingListEntity.getProducts().stream()
                .map(this::convertToProductDto)
                .collect(Collectors.toList());
        listFullDto.setId(shoppingListEntity.getId());
        listFullDto.setName(shoppingListEntity.getName());
        listFullDto.setProductDtoList(productDtoList);
        listFullDto.setCreatedAt(shoppingListEntity.getCreatedAt());

        return listFullDto;
    }
    private ProductDto convertToProductDto (ProductEntity productEntity) {
        ProductDto productDto = new ProductDto();
        productDto.setId(productEntity.getId());
        productDto.setName(productEntity.getName());
        productDto.setTaken(productEntity.getTaken());
        return productDto;
    }


    public List<ListShortDto> getShoppingLists() {
        Long userId = userService.getCurrentUserId();
        return shoppingListRepository.findAllByAuthorId(userId).stream()
                .map(this::convertToListShortDto)
                .collect(Collectors.toList());
    }

    public ListFullDto getShoppingList(Long id) {
        Optional<ShoppingListEntity> optionalShoppingListEntity = shoppingListRepository.findById(id);
        if (optionalShoppingListEntity.isEmpty()) {
            throw new EntityNotFoundException("Could not find list of id " + id);
        }
        return convertToListFullDto(optionalShoppingListEntity.get());
    }
    public ProductEntity convertToProductEntity(ProductDto productDto, ShoppingListEntity shoppingListEntity) {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setName(productDto.getName());
        productEntity.setList(shoppingListEntity);

        return productEntity;
    }
    @Transactional
    public ListFullDto editShoppingList(ListFullDto listFullDto) {
        var currentUserId = userService.getCurrentUserId();
        var shoppingListEntityOpt = shoppingListRepository.findById(listFullDto.getId());

        if (shoppingListEntityOpt.isEmpty()) {
            throw new EntityNotFoundException("There's no shopping list with id " + listFullDto.getId());
        }

        var shoppingListEntity = shoppingListEntityOpt.get();

        if (!shoppingListEntity.getAuthor().getId().equals(currentUserId)) {
            throw new IllegalArgumentException("Invalid list id: " + shoppingListEntity.getId());
        }

        shoppingListEntity.setName(listFullDto.getName());
        shoppingListRepository.save(shoppingListEntity);

        return convertToListFullDto(shoppingListEntity);
    }
    public void deleteShoppingList(Long id) {
        Long currentUserId = userService.getCurrentUserId();
        var shoppingListEntity = shoppingListRepository.findById(id);
        if (shoppingListEntity.isEmpty()) {
            throw new EntityNotFoundException("No shopping list with id " + id);
        }
        if (shoppingListEntity.get().getAuthor().getId() != currentUserId) {
            throw new IllegalArgumentException("Invalid list id " + id);
        }
        shoppingListRepository.deleteById(id);
    }

    @Transactional
    public ListFullDto createShoppingList(ShoppingListCreationDto shoppingListCreationDto) {
        UserEntity userEntity = userService.getCurrentUserEntity();

        ShoppingListEntity shoppingListEntity = new ShoppingListEntity();
        shoppingListEntity.setCreatedAt(LocalDate.now());
        shoppingListEntity.setName(shoppingListCreationDto.getName());
        shoppingListEntity.setAuthor(userEntity);

        ShoppingListEntity savedShoppingListEntity = shoppingListRepository.save(shoppingListEntity);

        return convertToListFullDto(savedShoppingListEntity);
    }


    @Transactional
    public ProductDto addProduct(ProductCreationDto productCreationDto) {
        var currentUserId = userService.getCurrentUserId();

        var shoppingListEntity = shoppingListRepository.findById(productCreationDto.getListId())
                .orElseThrow(() -> new EntityNotFoundException("No list of id " + productCreationDto.getListId()));

        if (!currentUserId.equals(shoppingListEntity.getAuthor().getId())) {
            throw new IllegalArgumentException("Invalid list id " + productCreationDto.getListId());
        }

        var productEntity = new ProductEntity();
        productEntity.setName(productCreationDto.getProductName());
        productEntity.setList(shoppingListEntity);
        productEntity.setTaken(Boolean.FALSE);

        var savedEntity = productRepository.save(productEntity);

        return convertToProductDto(savedEntity);
    }
    @Transactional
    public void deleteProduct(Long productId) {
        var currentUserId = userService.getCurrentUserId();

        var productEntity = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("No product of id " + productId));

        var shoppingListEntity = productEntity.getList();

        if (!currentUserId.equals(shoppingListEntity.getAuthor().getId())) {
            throw new IllegalArgumentException("Invalid operation, current user is not the author of the list this product belongs to.");
        }

        productRepository.delete(productEntity);
    }

    @Transactional
    public void takeAProduct(CheckboxDto checkboxDto) {
        Long productId = checkboxDto.getProductId();
        Boolean taken = checkboxDto.getTaken();
        Long currentUserId = userService.getCurrentUserId();
        var productEntity = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("No product of id " + productId));
        var shoppingListEntity = productEntity.getList();
        if (!currentUserId.equals(shoppingListEntity.getAuthor().getId())) {
            throw new IllegalArgumentException("Invalid operation, current user is not the author of the list this product belongs to.");
        }
        productEntity.setTaken(taken);
        productRepository.save(productEntity);
    }
    public Integer countAllTakenOfList(ShoppingListEntity shoppingListEntity) {
        if (shoppingListEntity.getProducts() == null) {
            return 0;
        }
        return (int)shoppingListEntity.getProducts().stream()
                .filter(ProductEntity::getTaken)
                .count();
    }
    @Transactional
    public void clearTakenOfList(Long listId) {
        Long currentUserId = userService.getCurrentUserId();
        var shoppingListEntity = shoppingListRepository.findById(listId)
                .orElseThrow(() -> new EntityNotFoundException("No list of id " + listId));
        if (!currentUserId.equals(shoppingListEntity.getAuthor().getId())) {
            throw new IllegalArgumentException("Invalid operation, current user is not the author of the list");
        }
        shoppingListEntity.getProducts().forEach(pr -> pr.setTaken(false));
        shoppingListRepository.save(shoppingListEntity);
    }
}
