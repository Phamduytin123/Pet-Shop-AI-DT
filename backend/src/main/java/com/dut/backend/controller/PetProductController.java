package com.dut.backend.controller;

import com.dut.backend.annotation.auth.PreAuthorizeAllWithoutCustomer;
import com.dut.backend.annotation.auth.PreAuthorizeCustomer;
import com.dut.backend.common.model.AbstractResponse;
import com.dut.backend.dto.request.AddPetProductRequest;
import com.dut.backend.dto.request.UpdatePetProductRequest;
import com.dut.backend.entity.PetProduct;
import com.dut.backend.service.PetProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/petProducts")
public class PetProductController {
    private final PetProductService petProductService;
    @GetMapping
    public ResponseEntity<AbstractResponse> getAllPetProducts() {
        var res = petProductService.getAllPetProducts();
        return  ResponseEntity.ok(AbstractResponse.successWithoutMeta(res));
    }
    @GetMapping("/{petProductId}")
    public  ResponseEntity<AbstractResponse> getPetProductById(@PathVariable("petProductId") Long petProductId) {
        try {
            var res = petProductService.getPetProductById(petProductId);
            return  ResponseEntity.ok(AbstractResponse.successWithoutMeta(res));
        } catch (BadRequestException e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @PostMapping("/add")
    @PreAuthorizeAllWithoutCustomer
    public ResponseEntity<AbstractResponse> addPetProduct(@RequestBody @Valid AddPetProductRequest request) {
        try {
            var res = petProductService.addPetProduct(request);
            return  ResponseEntity.ok(AbstractResponse.successWithoutMeta(res));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @PutMapping("/addImage")
    @PreAuthorizeAllWithoutCustomer
    public ResponseEntity<AbstractResponse> addImage(@RequestParam("petProductId")Long petProductId,
                                                     @RequestParam("file") MultipartFile avatar) {
        try {
            var result = petProductService.addImage(avatar,petProductId);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
        } catch (BadRequestException e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @PutMapping("/update")
    @PreAuthorizeAllWithoutCustomer
    public ResponseEntity<AbstractResponse> updatePetProduct(@RequestBody @Valid UpdatePetProductRequest request) {
        try {
            var result = petProductService.upatePetProduct(request);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
        } catch (BadRequestException e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
}
