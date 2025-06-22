package com.dut.backend.controller;

import com.dut.backend.annotation.auth.PreAuthorizeAllWithoutCustomer;
import com.dut.backend.common.model.AbstractResponse;
import com.dut.backend.dto.request.AddPetDetailByBreedRequest;
import com.dut.backend.dto.request.UpdatePetDetailRequest;
import com.dut.backend.entity.PetDetail;
import com.dut.backend.service.PetDetailService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    @PostMapping("/add")
    @PreAuthorizeAllWithoutCustomer
    public ResponseEntity<AbstractResponse> addPetDetail(@RequestBody AddPetDetailByBreedRequest request) {
        try {
            var result = petDetailService.addPetDetailByBreed(request);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
        } catch (BadRequestException e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @PutMapping("/addImage")
    @PreAuthorizeAllWithoutCustomer
    public ResponseEntity<AbstractResponse> addImage(@RequestParam("petDetailId")Long petId,
                                                     @RequestParam("file") MultipartFile file) {
        try {
            var result = petDetailService.addPetDetailImage(file,petId);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
        } catch (BadRequestException e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @PutMapping("/update")
    @PreAuthorizeAllWithoutCustomer
    public ResponseEntity<AbstractResponse> updatePetDetailInfo(@RequestBody UpdatePetDetailRequest request) {
        try {
            var result = petDetailService.updatePetDetailInfo(request);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
        } catch (BadRequestException e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @DeleteMapping("/delete")
    public ResponseEntity<AbstractResponse> deletePetDetail(@RequestParam("petDetailId") Long petDetailId) {
        try {
            System.out.println(petDetailId);
            petDetailService.deletePetDetailById(petDetailId);
            return ResponseEntity.ok(AbstractResponse.successWithoutMetaAndData());
        } catch ( RuntimeException e){
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
}
