package com.dut.backend.service.Impl;

import com.dut.backend.dto.request.AddPetProductRequest;
import com.dut.backend.dto.request.UpdatePetProductRequest;
import com.dut.backend.entity.PetProduct;
import com.dut.backend.repository.PetProductRepository;
import com.dut.backend.service.CloudinaryService;
import com.dut.backend.service.PetProductService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PetProductServiceImpl implements PetProductService {
    private final PetProductRepository petProductRepository;
    private final CloudinaryService cloudinaryService;
    @Override
    public PetProduct addPetProduct(AddPetProductRequest request) {
        PetProduct petProduct = PetProduct.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .type(request.getType())
                .build();
        return petProductRepository.save(petProduct);
    }

    @Override
    public List<PetProduct> getAllPetProducts() {
        return petProductRepository.findAll();
    }

    @Override
    public PetProduct getPetProductById(Long id) throws BadRequestException {
        PetProduct petProduct = petProductRepository.findById(id).orElse(null);
        if (petProduct == null) {
            throw new BadRequestException("Pet product not found");
        }
        return petProduct;
    }

    @Override
    public PetProduct addImage(MultipartFile file, Long petProductId) throws BadRequestException {
        PetProduct foundPetProduct = petProductRepository.findById(petProductId).orElse(null);
        if (foundPetProduct == null) {
            throw new BadRequestException("Not Found Pet Product To Update Image");
        }
        foundPetProduct.setImage(cloudinaryService.uploadFile(file));
        return petProductRepository.save(foundPetProduct);
    }

    @Override
    public PetProduct upatePetProduct(UpdatePetProductRequest request) throws BadRequestException {
        PetProduct foundPetProduct = petProductRepository.findById(request.getPetProductId()).orElse(null);
        if (foundPetProduct == null) {
            throw new BadRequestException("Not Found Pet Product To Update Information");
        }
        foundPetProduct.setName(request.getName());
        foundPetProduct.setDescription(request.getDescription());
        foundPetProduct.setPrice(request.getPrice());
        foundPetProduct.setQuantity(request.getQuantity());
        foundPetProduct.setType(request.getType());
        return petProductRepository.save(foundPetProduct);
    }
}
