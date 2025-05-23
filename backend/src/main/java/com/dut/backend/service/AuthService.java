package com.dut.backend.service;

import com.dut.backend.dto.request.*;
import com.dut.backend.dto.response.CredentialResponse;
import com.dut.backend.entity.Account;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


public interface AuthService {
    CredentialResponse login(LoginRequest loginRequest) throws BadRequestException;

    void register(RegisterRequest registerRequest) throws BadRequestException;

    Account confirmRegister(ConfirmRegisterRequest request) throws BadRequestException;

    Account updateAccountInfo(UpdateAccountInfoRequest request) throws BadRequestException;

    Account updateAccountAvatar(MultipartFile avatar, Long accountId) throws BadRequestException;

    Account updatePassword(UpdatePasswordRequest request) throws BadRequestException;
}
