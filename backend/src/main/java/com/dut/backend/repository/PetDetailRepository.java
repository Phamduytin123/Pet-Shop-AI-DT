package com.dut.backend.repository;

import com.dut.backend.entity.PetDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetDetailRepository extends JpaRepository<PetDetail, Long> {
}
