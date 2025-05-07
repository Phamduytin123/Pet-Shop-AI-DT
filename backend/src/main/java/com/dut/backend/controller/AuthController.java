package com.dut.backend.controller;

import com.dut.backend.annotation.auth.CurrentAccount;
import com.dut.backend.annotation.auth.PreAuthorizeAll;
import com.dut.backend.annotation.auth.PreAuthorizeCustomer;
import com.dut.backend.common.model.AbstractResponse;
import com.dut.backend.config.JwtUtil;
import com.dut.backend.dto.request.ConfirmRegisterRequest;
import com.dut.backend.dto.request.LoginRequest;
import com.dut.backend.dto.request.RegisterRequest;
import com.dut.backend.dto.response.AccountInfo;
import com.dut.backend.entity.Account;
import com.dut.backend.repository.AccountRepository;
import com.dut.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    @GetMapping("/me")
    @PreAuthorizeAll
    public ResponseEntity<AbstractResponse> getAccountInfo(@CurrentAccount Account account) {
        System.out.println(account);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(new AccountInfo().fromEntity(account)));
    }
    @PostMapping("/register")
    public ResponseEntity<AbstractResponse> register(@RequestBody RegisterRequest registerRequest) throws BadRequestException {
        System.out.println(registerRequest);
//        var accountResponse = authService.register(registerRequest);
//        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(accountResponse));
        authService.register(registerRequest);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta("success"));
    }

    @PostMapping("/login")
    public ResponseEntity<AbstractResponse> login(@RequestBody LoginRequest request) throws BadRequestException {
        var credentialRespone = authService.login(request);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(credentialRespone));
    }
    @PostMapping("/confirm-register")
    public ResponseEntity<AbstractResponse> confirmRegister(@RequestBody ConfirmRegisterRequest request) throws BadRequestException {
        var account = authService.confirmRegister(request);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(account));
    }
    @GetMapping("demo")
//    @PreAuthorizeCustomer
    public ResponseEntity<String> demo( @CurrentAccount Account account) {
        System.out.println(account);
        return ResponseEntity.ok("Authorized");
    }
}
