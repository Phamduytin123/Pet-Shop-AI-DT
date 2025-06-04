package com.dut.backend.dto.request;

import com.dut.backend.entity.Enum.ProductType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AddPetProductRequest {
    @NotNull
    private String name;
    @NotNull
    private ProductType type;
    @NotNull
    private String description;
    @NotNull
    private Integer price;
    @NotNull
    private Integer quantity;
}
