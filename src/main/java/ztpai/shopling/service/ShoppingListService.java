package ztpai.shopling.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ztpai.shopling.model.ProductEntity;
import ztpai.shopling.model.ShoppingListEntity;
import ztpai.shopling.model.UserEntity;
import ztpai.shopling.model.dto.ListFullDto;
import ztpai.shopling.model.dto.ListShortDto;
import ztpai.shopling.model.dto.ProductDto;
import ztpai.shopling.model.dto.ShoppingListCreationDto;
import ztpai.shopling.repository.ProductRepository;
import ztpai.shopling.repository.ShoppingListRepository;

import javax.persistence.Entity;
import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
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
        shortListDto.setCreatedAt(shoppingListEntity.getCreatedAt());

        return shortListDto;
    }
    private ListFullDto convertToListFullDto(ShoppingListEntity shoppingListEntity) {
        ListFullDto listFullDto = new ListFullDto();
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

        List<ProductEntity> productEntities = shoppingListCreationDto.getProductList().stream()
                .map(productDto -> convertToProductEntity(productDto, savedShoppingListEntity))
                .collect(Collectors.toList());

        productEntities = productRepository.saveAll(productEntities);

        savedShoppingListEntity.setProducts(productEntities);

        return convertToListFullDto(savedShoppingListEntity);
    }


}
