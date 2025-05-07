package com.dut.backend.dto.request;

import lombok.Data;

@Data
public class ConfirmRegisterRequest {
    private String email;
    private String otp;
}
