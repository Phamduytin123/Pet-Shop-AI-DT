package com.dut.backend.controller;

import com.dut.backend.common.model.AbstractResponse;
import com.dut.backend.entity.PetDetail;
import com.dut.backend.service.PetDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/pet-detail")
public class PetDetailController {
    private final PetDetailService petDetailService;
    @GetMapping("/{petDetailId}")
    public ResponseEntity<AbstractResponse> getPetDetail(@PathVariable("petDetailId") Long petDetailId) {
        try {
            PetDetail result = petDetailService.getPetDetailById(petDetailId);
            if (result == null) {
                return ResponseEntity.status(404).body(AbstractResponse.error("PetDetail not found"));
            }
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
}
