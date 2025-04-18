package com.dut.backend.service.Impl;

import com.dut.backend.entity.Pet;
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
    @Override
    public List<Pet> getAllPets() {
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
