package com.dut.backend.service;

public interface  MailService {
    void sendOtpEmail(String toEmail, String otp);
}
