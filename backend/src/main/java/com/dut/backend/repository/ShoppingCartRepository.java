package com.dut.backend.repository;

import com.dut.backend.entity.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    List<ShoppingCart> findByAccountId(Long accountId);
    Optional<ShoppingCart> findByAccountIdAndItemId(Long accountId, Long itemId);
}
