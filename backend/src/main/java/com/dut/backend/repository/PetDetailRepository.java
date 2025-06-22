package com.dut.backend.repository;

import com.dut.backend.entity.PetDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PetDetailRepository extends JpaRepository<PetDetail, Long> {
//    @Override
//    @Modifying
//    @Query("UPDATE ItemBase i SET i.deletedAt = CURRENT_TIMESTAMP WHERE i.id = :id")
//    void deleteById(@Param("id") Long id);
//
//    // Phương thức xóa cứng (nếu cần)
//    @Modifying
//    @Query("DELETE FROM PetDetail pd WHERE pd.id = :id")
//    void hardDeleteById(@Param("id") Long id);
}
