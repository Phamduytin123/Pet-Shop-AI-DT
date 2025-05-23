package com.dut.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AddPetRequest {
    @NotNull
    private String name;
    @NotNull
    private String breed;
    @NotNull
    private Integer difficulty;
    @NotNull
    private String behavior;
    @NotNull
    private Integer ferocious;
    @NotNull
    private Integer space;
    @NotNull
    private Integer petGroup;
    @NotNull
    private String description;
}
