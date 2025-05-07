package com.dut.backend.service;

import com.dut.backend.dto.request.ConfirmRegisterRequest;
import com.dut.backend.dto.request.LoginRequest;
import com.dut.backend.dto.request.RegisterRequest;
import com.dut.backend.dto.response.CredentialResponse;
import com.dut.backend.entity.Account;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;


public interface AuthService {
    CredentialResponse login(LoginRequest loginRequest) throws BadRequestException;

    void register(RegisterRequest registerRequest) throws BadRequestException;

    Account confirmRegister(ConfirmRegisterRequest request) throws BadRequestException;
}
