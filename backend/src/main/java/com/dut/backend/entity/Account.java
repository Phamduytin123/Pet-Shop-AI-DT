package com.dut.backend.entity;

import com.dut.backend.entity.Enum.AccountRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "accounts")
public class Account extends EntityBase{
    @Column(nullable = false, unique = true)
    private String email;
    private String avatarUrl;
    @Column(nullable = false)
    private String password;
    private String fullName;
    private String phoneNumber;
    private String address;
    private LocalDate birthDate;
    private boolean gender;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AccountRole role;
    private boolean isActive;
}
