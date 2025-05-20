package com.dut.backend.service.Impl;

import com.dut.backend.dto.request.AddPetDetailRequest;
import com.dut.backend.entity.Pet;
import com.dut.backend.entity.PetDetail;
import com.dut.backend.repository.PetDetailRepository;
import com.dut.backend.repository.PetRepository;
import com.dut.backend.service.PetDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PetDetailServiceImpl implements PetDetailService {
    private final PetDetailRepository petDetailRepository;
    private final PetRepository petRepository;
    @Override
    public List<PetDetail> addListPetDetail(List<AddPetDetailRequest> requestList) {
        List<PetDetail> petDetails = requestList.stream()
                .map(addPetDetailRequest -> {
                    Pet pet = petRepository.findById(addPetDetailRequest.getPetId()).orElse(null);
                    return PetDetail.builder()
                            .color(addPetDetailRequest.getColor())
                            .age(addPetDetailRequest.getAge())
                            .gender(addPetDetailRequest.isGender())
                            .image(addPetDetailRequest.getImage())
                            .heathStatus(addPetDetailRequest.getHeathStatus())
                            .price(addPetDetailRequest.getPrice())
                            .quantity(addPetDetailRequest.getQuantity())
                            .pet(pet)
                            .name(addPetDetailRequest.getName())
                            .build();
                })
                .collect(Collectors.toList());
        return  petDetailRepository.saveAll(petDetails);
    }

    @Override
    public List<PetDetail> getListPetDetailByBreed(String breed) {
        return petRepository.findByBreed(breed).getPetDetails();
    }

    @Override
    public PetDetail getPetDetailById(Long id) {
        return petDetailRepository.findById(id).orElse(null);
    }
}
