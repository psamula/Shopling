package ztpai.shopling.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ztpai.shopling.model.ProductEntity;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
}
