package com.dut.backend.controller;

import com.dut.backend.common.model.AbstractResponse;
import com.dut.backend.common.util.CommonUtils;
import com.dut.backend.entity.Pet;
import com.dut.backend.service.PetService;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.transaction.reactive.AbstractReactiveTransactionManager;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/pets")
public class PetController {
    private final PetService petService;
    private final RestTemplate restTemplate;
    @GetMapping
    public ResponseEntity<AbstractResponse> getAllPets() {
        List<Pet> pets = petService.getAllPets();
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(pets));
    }
    @GetMapping("/breeds")
    public ResponseEntity<AbstractResponse> getAllBreeds() {
        List<String> breeds = petService.getAllBreedPets();
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(breeds));
    }
    @PostMapping("/predict")
    public ResponseEntity<AbstractResponse> predict(@RequestParam("file") MultipartFile file) {
        try {
            // Kiểm tra tệp có được nhận chưa
            System.out.println("Received file: " + file.getOriginalFilename());
            Dotenv dotenv = Dotenv.load();
            // URL của server AI nơi bạn gửi yêu cầu dự đoán
            String aiServerUrl = dotenv.get("AI_API_URL");
            System.out.println(aiServerUrl);
            // Tạo header cho yêu cầu
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            // Tạo MultiValueMap để gửi tệp dưới dạng form-data
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("image", new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();  // Đảm bảo gửi đúng tên tệp
                }
            });
            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            // Gửi yêu cầu POST đến server AI
            String predictedClass = restTemplate.exchange(aiServerUrl, HttpMethod.POST, requestEntity, String.class).getBody();

            Map<String, Object> responseMap = CommonUtils.Json.decode(predictedClass, Map.class);
            String dataJson = (String) responseMap.get("class");
            System.out.println(dataJson);

            Pet pet = petService.getPetByBreed(dataJson);

            // Trả lại kết quả dự đoán
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(pet));
        } catch (Exception e) {
            // Nếu có lỗi xảy ra trong quá trình gửi yêu cầu hoặc nhận kết quả
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
}
