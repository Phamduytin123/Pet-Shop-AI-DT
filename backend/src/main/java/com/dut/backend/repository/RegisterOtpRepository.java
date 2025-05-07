package com.dut.backend.repository;

import com.dut.backend.entity.RegisterOTP;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegisterOtpRepository extends JpaRepository<RegisterOTP, Long> {
    Optional<RegisterOTP> findByEmail(String email);
    Optional<RegisterOTP> findByEmailAndOtp(String email, String otp);
}
