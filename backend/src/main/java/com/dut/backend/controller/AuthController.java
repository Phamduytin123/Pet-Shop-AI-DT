package com.dut.backend.controller;

import com.dut.backend.annotation.auth.*;
import com.dut.backend.common.model.AbstractResponse;
import com.dut.backend.config.JwtUtil;
import com.dut.backend.dto.request.*;
import com.dut.backend.dto.response.AccountInfo;
import com.dut.backend.entity.Account;
import com.dut.backend.repository.AccountRepository;
import com.dut.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


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
        try {
            var credentialRespone = authService.login(request);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(credentialRespone));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }

    }
    @PostMapping("/confirm-register")
    public ResponseEntity<AbstractResponse> confirmRegister(@RequestBody ConfirmRegisterRequest request) throws BadRequestException {
        var account = authService.confirmRegister(request);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(account));
    }
    @PutMapping("/updateInfo")
    @PreAuthorizeAll
    public ResponseEntity<AbstractResponse> updateInfo(  @RequestBody @Valid UpdateAccountInfoRequest request) {
        System.out.println(request);
        try {
            var res = authService.updateAccountInfo(request);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(res));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @PutMapping("/updateAvatar")
    @PreAuthorizeAll
    public ResponseEntity<AbstractResponse> updateAvatar(@CurrentAccount Account account,
                                                         @RequestParam("file") MultipartFile avatar) {
        try {
            var updatedAccount = authService.updateAccountAvatar(avatar, account.getId());
         return ResponseEntity.ok(AbstractResponse.successWithoutMeta(updatedAccount));
        } catch (BadRequestException e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @PutMapping("/updatePassword")
    @PreAuthorizeAll
    public ResponseEntity<AbstractResponse> updatePassword(@RequestBody @Valid UpdatePasswordRequest request) {
        try {
            System.out.println("controler "+request);
            var updatedAccount = authService.updatePassword(request);
            System.out.println("controler "+updatedAccount);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(updatedAccount));
        } catch (BadRequestException e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @GetMapping("/alls")
    @PreAuthorizeAllWithoutCustomer
    public ResponseEntity<AbstractResponse> getAllAccounts (){
        try {
            var result = authService.getAllAccount();
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @PutMapping("/updateRole")
    public ResponseEntity<AbstractResponse> updateRole (@RequestBody UpdateAccountRoleRequest request){
        try {
            var result = authService.updateAccountRole(request);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @PutMapping("/updateActive")
    public ResponseEntity<AbstractResponse> updateActivate (@RequestBody UpdateActivateRequest request){
        try {
            var result = authService.updateAccountActive(request);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
}
