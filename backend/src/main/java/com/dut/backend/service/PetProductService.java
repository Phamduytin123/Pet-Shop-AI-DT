package com.dut.backend.service;

import com.dut.backend.dto.request.AddPetProductRequest;
import com.dut.backend.dto.request.UpdatePetProductRequest;
import com.dut.backend.entity.PetProduct;
import org.apache.coyote.BadRequestException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PetProductService {
    PetProduct addPetProduct(AddPetProductRequest request);
    List<PetProduct> getAllPetProducts();
    PetProduct getPetProductById(Long id) throws BadRequestException;
    PetProduct addImage(MultipartFile file, Long petProductId) throws BadRequestException;
    PetProduct upatePetProduct(UpdatePetProductRequest request) throws BadRequestException;
}
