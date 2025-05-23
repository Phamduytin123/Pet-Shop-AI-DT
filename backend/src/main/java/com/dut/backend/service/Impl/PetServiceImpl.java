package com.dut.backend.service.Impl;

import com.dut.backend.dto.request.AddPetRequest;
import com.dut.backend.dto.request.UpdatePetRequest;
import com.dut.backend.entity.Enum.ProductType;
import com.dut.backend.entity.Pet;
import com.dut.backend.entity.PetDetail;
import com.dut.backend.entity.PetProduct;
import com.dut.backend.repository.PetDetailRepository;
import com.dut.backend.repository.PetProductRepository;
import com.dut.backend.repository.PetRepository;
import com.dut.backend.service.CloudinaryService;
import com.dut.backend.service.PetService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Service
@RequiredArgsConstructor
public class PetServiceImpl  implements PetService {
    @Autowired
    private final PetRepository petRepository;
    private final PetDetailRepository petDetailRepository;
    private final PetProductRepository petProductRepository;
    private final CloudinaryService cloudinaryService;
    @Override
    public List<Pet> getAllPets() {
        List<Pet> pets = petRepository.findAll();
//        for (Pet pet : pets) {
//            System.out.println("oke"+pet.getName());
//            System.out.println(pet.getPetDetails());
//        }
        PetDetail petDetail = PetDetail.builder()
                .price(1000)
                .quantity(1)
                .color("brown")
                .age(2)
                .gender(true)
                .image("null")
                .heathStatus("oke")
                .build();
//        petDetailRepository.save(petDetail);
        PetProduct petProduct = PetProduct.builder().name("tro choi 1").type(ProductType.Food).image("null").build();
//        petProductRepository.save(petProduct);
        return petRepository.findAll();
    }

    @Override
    public List<String> getAllBreedPets() {
        return  petRepository.findBreeds();
    }

    @Override
    public Pet getPetByBreed(String breed) {
        return petRepository.findByBreed(breed);
    }

    @Override
    public Pet addPetInfo(AddPetRequest request) throws BadRequestException {
        Pet foundPet = petRepository.findByBreed(request.getBreed());
        if (foundPet != null) {
            throw new BadRequestException("This breed already exists");
        }
        Pet pet = Pet.builder()
                .name(request.getName())
                .breed(request.getBreed())
                .difficulty(request.getDifficulty())
                .behavior(request.getBehavior())
                .ferocious(request.getFerocious())
                .space(request.getSpace())
                .petGroup(request.getPetGroup())
                .description(request.getDescription())
                .build();
        return petRepository.save(pet);
    }

    @Override
    public Pet addImagePet(MultipartFile avatar, Long petId) throws BadRequestException {
        Pet foundPet = petRepository.findById(petId).orElseThrow(() -> new BadRequestException("Not Found Pet To Add Image !!"));
        String image = cloudinaryService.uploadFile(avatar);
        foundPet.setImage(image);
        return petRepository.save(foundPet);
    }

    @Override
    public Pet updatePetInfo(UpdatePetRequest request) throws BadRequestException {
        Pet foundPet = petRepository.findByBreed(request.getBreedSearch());
        if (foundPet == null) {
            throw new BadRequestException("Not Found Pet To Update !!!");
        }
        foundPet.setName(request.getName());
        foundPet.setBreed(request.getBreed());
        foundPet.setDifficulty(request.getDifficulty());
        foundPet.setBehavior(request.getBehavior());
        foundPet.setFerocious(request.getFerocious());
        foundPet.setSpace(request.getSpace());
        foundPet.setPetGroup(request.getPetGroup());
        foundPet.setDescription(request.getDescription());
        return petRepository.save(foundPet);
    }
}
