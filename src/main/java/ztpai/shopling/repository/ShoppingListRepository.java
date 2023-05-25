package ztpai.shopling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ztpai.shopling.model.ShoppingListEntity;

import java.util.List;

@Repository
public interface ShoppingListRepository extends JpaRepository<ShoppingListEntity, Long> {
    List<ShoppingListEntity> findAllByAuthorId(Long authorId);
}
