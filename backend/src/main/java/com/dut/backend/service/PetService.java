package com.dut.backend.service;

import com.dut.backend.dto.request.AddPetRequest;
import com.dut.backend.dto.request.UpdatePetRequest;
import com.dut.backend.entity.Pet;
import org.apache.coyote.BadRequestException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PetService {
    List<Pet> getAllPets();
    List<String> getAllBreedPets();
    Pet getPetByBreed(String breed);
    Pet addPetInfo(AddPetRequest request) throws BadRequestException;
    Pet addImagePet(MultipartFile avatar, Long petId) throws BadRequestException;
    Pet updatePetInfo(UpdatePetRequest request) throws BadRequestException;
    List<Pet> searchPetsByName(String keyword);
    void DeleteById(Long id);
}
