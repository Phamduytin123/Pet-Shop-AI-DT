package com.dut.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterOTP extends EntityBase{

    private String email;

    private String password;

    private String fullName;

    private String otp;

    private LocalDateTime expiredAt;

    private boolean isConfirmed;
}