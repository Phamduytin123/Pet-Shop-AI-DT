package com.dut.backend.repository;

import com.dut.backend.entity.PetProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetProductRepository extends JpaRepository<PetProduct, Long> {
}
