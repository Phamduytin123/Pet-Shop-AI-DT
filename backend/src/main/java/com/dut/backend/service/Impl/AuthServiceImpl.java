package com.dut.backend.service.Impl;

import com.dut.backend.common.constant.ErrorMessageConstants;
import com.dut.backend.common.exception.ForbiddenException;
import com.dut.backend.config.JwtUtil;
import com.dut.backend.dto.request.ConfirmRegisterRequest;
import com.dut.backend.dto.request.LoginRequest;
import com.dut.backend.dto.request.RegisterRequest;
import com.dut.backend.dto.response.CredentialResponse;
import com.dut.backend.entity.Account;
import com.dut.backend.entity.Enum.AccountRole;
import com.dut.backend.entity.RegisterOTP;
import com.dut.backend.repository.AccountRepository;
import com.dut.backend.repository.RegisterOtpRepository;
import com.dut.backend.service.AuthService;
import com.dut.backend.service.MailService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final MailService mailService;
    private final RegisterOtpRepository registerOtpRepository;

    @Override
    public CredentialResponse login(LoginRequest loginRequest) throws BadRequestException {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
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
    public void register(RegisterRequest registerRequest) throws BadRequestException {
        if (!registerRequest.getPassword().equals(registerRequest.getConfirmPassword())) {
            throw new BadRequestException(ErrorMessageConstants.CONFIRM_PASSWORD_NOT_MATCHING);
        }
        if (accountRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new BadRequestException(ErrorMessageConstants.EMAIL_ALREADY_EXISTS);
        }
        // Generate OTP
        String otp = generateOtp();
        LocalDateTime expiredAt = LocalDateTime.now().plusMinutes(5);
        System.out.println(otp);
        // Send OTP to email (Mailtrap)
        try {
            mailService.sendOtpEmail(registerRequest.getEmail(), otp);
        } catch (Exception e) {
            throw new BadRequestException("Không thể gửi mã OTP tới email.");
        }

        RegisterOTP registerOTP = RegisterOTP.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .fullName(registerRequest.getFullName())
                .otp(otp)
                .expiredAt(expiredAt)
                .isConfirmed(false)
                .build();

        registerOtpRepository.save(registerOTP);

//        Account account = Account.builder()
//                .email(registerRequest.getEmail())
//                .password(passwordEncoder.encode(registerRequest.getPassword()))
//                .role(AccountRole.CUSTOMER)
//                .isActive(true)
//                .build();
//        try {
//            return accountRepository.save(account);
//        } catch (Exception e) {
//            throw new BadRequestException(ErrorMessageConstants.ACCOUNT_SAVE_FAILED);
//        }
    }

    @Override
    public Account confirmRegister(ConfirmRegisterRequest request) throws BadRequestException {
        var registerOtp = registerOtpRepository.findByEmailAndOtp(request.getEmail(), request.getOtp())
                .orElseThrow(() -> new BadRequestException("OTP CODE INCORRECT!"));

        if (registerOtp.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("OTP CODE EXPIRED");
        }

        if (registerOtp.isConfirmed()) {
            throw new BadRequestException("ACCOUNT WITH CONFIRMED IS ALREADY CONFIRMED");
        }

        // Tạo tài khoản chính thức
        Account account = Account.builder()
                .email(registerOtp.getEmail())
                .password(registerOtp.getPassword())
                .fullName(registerOtp.getFullName())
                .role(AccountRole.CUSTOMER)
                .isActive(true)
                .build();

        accountRepository.save(account);

        // Cập nhật trạng thái đã xác nhận
        registerOtp.setConfirmed(true);
        registerOtpRepository.save(registerOtp);

        return account;
    }

    private String generateOtp() {
        return String.valueOf((int)((Math.random() * 900000) + 100000)); // 6-digit OTP
    }
}
