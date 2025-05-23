package com.dut.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UpdatePasswordRequest {
    @NotNull
    private Long accountId;
    @NotNull
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
    @NotNull
    @Size(min = 8, message = "Confirm password must be at least 8 characters")
    private String confirmPassword;
    @NotNull
    @Size(min = 8, message = "New password must be at least 8 characters")
    private String newPassword;
}
