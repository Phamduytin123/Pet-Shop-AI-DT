package com.dut.backend.service.Impl;

import com.dut.backend.entity.Enum.ProductType;
import com.dut.backend.entity.Pet;
import com.dut.backend.entity.PetDetail;
import com.dut.backend.entity.PetProduct;
import com.dut.backend.repository.PetDetailRepository;
import com.dut.backend.repository.PetProductRepository;
import com.dut.backend.repository.PetRepository;
import com.dut.backend.service.PetService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class PetServiceImpl  implements PetService {
    @Autowired
    private final PetRepository petRepository;
    private final PetDetailRepository petDetailRepository;
    private final PetProductRepository petProductRepository;
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
}
