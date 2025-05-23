package com.dut.backend.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UpdatePetDetailRequest {
    private Long petDetailId;
    private String color;
    private Integer age;
    private boolean gender;
    private String heathStatus;
    private Integer price;
    private Integer quantity;
}
