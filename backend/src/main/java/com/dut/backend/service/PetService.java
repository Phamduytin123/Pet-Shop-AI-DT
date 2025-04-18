package com.dut.backend.service;

import com.dut.backend.entity.Pet;

import java.util.List;

public interface PetService {
    List<Pet> getAllPets();
    List<String> getAllBreedPets();
    Pet getPetByBreed(String breed);
}
