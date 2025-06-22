package com.dut.backend.service.Impl;

import com.dut.backend.dto.request.AddPetDetailByBreedRequest;
import com.dut.backend.dto.request.AddPetDetailRequest;
import com.dut.backend.dto.request.UpdatePetDetailRequest;
import com.dut.backend.entity.ItemBase;
import com.dut.backend.entity.Pet;
import com.dut.backend.entity.PetDetail;
import com.dut.backend.repository.ItemBaseRepository;
import com.dut.backend.repository.PetDetailRepository;
import com.dut.backend.repository.PetRepository;
import com.dut.backend.service.CloudinaryService;
import com.dut.backend.service.PetDetailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PetDetailServiceImpl implements PetDetailService {
    private final PetDetailRepository petDetailRepository;
    private final PetRepository petRepository;
    private final CloudinaryService cloudinaryService;
    private final ItemBaseRepository itemBaseRepository;

    @Override
    public List<PetDetail> addListPetDetail(List<AddPetDetailRequest> requestList) {
        List<PetDetail> petDetails = requestList.stream()
                .map(addPetDetailRequest -> {
                    Pet pet = petRepository.findById(addPetDetailRequest.getPetId()).orElse(null);
                    return PetDetail.builder()
                            .color(addPetDetailRequest.getColor())
                            .age(addPetDetailRequest.getAge())
                            .dateIn(addPetDetailRequest.getDateIn())
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

    @Override
    public PetDetail addPetDetailByBreed(AddPetDetailByBreedRequest request) throws BadRequestException {
        Pet foundPet = petRepository.findByBreed(request.getBreed());
        if (foundPet == null) {
            throw new BadRequestException("Not found Pet to add PetDetail!");
        }
        PetDetail petDetail = PetDetail.builder()
                .color(request.getColor())
                .age(request.getAge())
                .dateIn(request.getDateIn())
                .gender(request.isGender())
                .heathStatus(request.getHeathStatus())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .pet(foundPet)
                .name(foundPet.getName())
                .build();
        return petDetailRepository.save(petDetail);
    }

    @Override
    public PetDetail addPetDetailImage(MultipartFile file, Long petDetailId) throws BadRequestException {
        PetDetail foundPetDetail = petDetailRepository.findById(petDetailId).orElseThrow(() -> new BadRequestException("Not Found PetDetail To Add Image !!"));
        String image = cloudinaryService.uploadFile(file);
        foundPetDetail.setImage(image);
        return petDetailRepository.save(foundPetDetail);
    }

    @Override
    public PetDetail updatePetDetailInfo(UpdatePetDetailRequest request) throws BadRequestException {
        PetDetail foundPetDetail = petDetailRepository.findById(request.getPetDetailId()).orElse(null);
        if (foundPetDetail == null) {
            throw new BadRequestException("Not found PetDetail To Update !!!");
        }
        foundPetDetail.setColor(request.getColor());
        foundPetDetail.setAge(request.getAge());
        foundPetDetail.setDateIn(request.getDateIn());
        foundPetDetail.setGender(request.isGender());
        foundPetDetail.setHeathStatus(request.getHeathStatus());
        foundPetDetail.setPrice(request.getPrice());
        foundPetDetail.setQuantity(request.getQuantity());
        return petDetailRepository.save(foundPetDetail);
    }

    @Override
//    @Transactional
    public void deletePetDetailById(Long id) {
        System.out.println(id);
//        PetDetail petDetail = petDetailRepository.findById(id).orElseThrow(() -> new RuntimeException("Pet Detail not found with id: " + id));
//        petDetailRepository.deleteById(petDetail.getId());
        ItemBase item = itemBaseRepository.findById(id).orElseThrow(() -> new RuntimeException("Pet Detail not found with id: " + id));
        itemBaseRepository.delete(item);
    }
}
