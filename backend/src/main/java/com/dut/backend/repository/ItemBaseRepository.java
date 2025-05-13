package com.dut.backend.repository;

import com.dut.backend.entity.ItemBase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemBaseRepository extends JpaRepository<ItemBase, Long> {
}
