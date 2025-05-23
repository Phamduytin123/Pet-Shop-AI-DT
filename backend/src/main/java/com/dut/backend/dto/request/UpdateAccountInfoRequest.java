package com.dut.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Getter
@Setter
public class UpdateAccountInfoRequest {
    @NotNull
    private Long accountId;
    @NotNull
    private String email;
    @NotNull
    private String fullName;
    @NotNull
    private String phoneNumber;
    @NotNull
    private String address;
    @NotNull
    private LocalDate birthDate;
    @NotNull
    private boolean gender;
}
