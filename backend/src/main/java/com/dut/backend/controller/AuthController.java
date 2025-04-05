package com.dut.backend.controller;

import com.dut.backend.common.model.AbstractResponse;
import com.dut.backend.config.JwtUtil;
import com.dut.backend.dto.request.LoginRequest;
import com.dut.backend.dto.request.RegisterRequest;
import com.dut.backend.repository.AccountRepository;
import com.dut.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AbstractResponse> register(@RequestBody RegisterRequest registerRequest) throws BadRequestException {
        System.out.println("oke");
        System.out.println(registerRequest);
        var accountResponse = authService.register(registerRequest);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(accountResponse));
    }

    @PostMapping("/login")
    public ResponseEntity<AbstractResponse> login(@RequestBody LoginRequest request) throws BadRequestException {
        var credentialRespone = authService.login(request);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(credentialRespone));
    }
}
