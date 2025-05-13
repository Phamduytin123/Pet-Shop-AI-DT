package com.dut.backend.service;

import com.dut.backend.dto.request.AddPetDetailRequest;
import com.dut.backend.entity.PetDetail;

import java.util.List;

public interface PetDetailService {
    List<PetDetail> addListPetDetail(List<AddPetDetailRequest> requestList);
    List<PetDetail> getListPetDetailByBreed(String breed);
    PetDetail getPetDetailById(Long id);
}
