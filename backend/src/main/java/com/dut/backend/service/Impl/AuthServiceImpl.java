package com.dut.backend.service.Impl;

import com.dut.backend.common.constant.ErrorMessageConstants;
import com.dut.backend.common.exception.ForbiddenException;
import com.dut.backend.config.JwtUtil;
import com.dut.backend.dto.request.LoginRequest;
import com.dut.backend.dto.request.RegisterRequest;
import com.dut.backend.dto.response.CredentialResponse;
import com.dut.backend.entity.Account;
import com.dut.backend.entity.Enum.AccountRole;
import com.dut.backend.repository.AccountRepository;
import com.dut.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Override
    public CredentialResponse login(LoginRequest loginRequest) throws BadRequestException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword()));
            Account account = accountRepository.findByEmail(loginRequest.getEmail()).orElse(null);
//            System.out.println(passwordEncoder.matches(loginRequest.getPassword(),account.getPassword()));
            return CredentialResponse.builder().token(jwtUtil.generateToken(account.getEmail(), account.getRole().name())).build();
        } catch (BadCredentialsException ex) {
            throw new BadRequestException(ErrorMessageConstants.INCORRECT_EMAIL_OR_PASSWORD);
        } catch (InternalAuthenticationServiceException ex) {
            throw new BadRequestException(ErrorMessageConstants.ACCOUNT_NOT_FOUND);
        } catch (DisabledException ex) {
            throw new ForbiddenException(ErrorMessageConstants.ACCOUNT_IS_DISABLED);
        }
    }

    @Override
    public Account register(RegisterRequest registerRequest) throws BadRequestException {
        if (accountRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new BadRequestException(ErrorMessageConstants.EMAIL_ALREADY_EXISTS);
        }
        Account account = Account.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(AccountRole.CUSTOMER)
                .isActive(true)
                .build();
        try {
            return accountRepository.save(account);
        } catch (Exception e) {
            throw new BadRequestException(ErrorMessageConstants.ACCOUNT_SAVE_FAILED);
        }
    }
}
