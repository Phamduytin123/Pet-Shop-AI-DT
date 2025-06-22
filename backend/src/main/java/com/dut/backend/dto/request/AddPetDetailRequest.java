package com.dut.backend.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Getter
@Setter
public class AddPetDetailRequest {
    private Long petId;
    private String name;
    private String color;
    private Integer age;
    private LocalDate dateIn;
    private boolean gender;
    private String image;
    private String heathStatus;
    private Integer price;
    private Integer quantity;
}
