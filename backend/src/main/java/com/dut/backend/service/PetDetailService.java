package com.dut.backend.service;

import com.dut.backend.dto.request.AddPetDetailByBreedRequest;
import com.dut.backend.dto.request.AddPetDetailRequest;
import com.dut.backend.dto.request.UpdatePetDetailRequest;
import com.dut.backend.entity.PetDetail;
import org.apache.coyote.BadRequestException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PetDetailService {
    List<PetDetail> addListPetDetail(List<AddPetDetailRequest> requestList);
    List<PetDetail> getListPetDetailByBreed(String breed);
    PetDetail getPetDetailById(Long id);
    PetDetail addPetDetailByBreed(AddPetDetailByBreedRequest request) throws BadRequestException;
    PetDetail addPetDetailImage(MultipartFile file, Long petDetailId) throws BadRequestException;
    PetDetail updatePetDetailInfo(UpdatePetDetailRequest request) throws BadRequestException;
}
