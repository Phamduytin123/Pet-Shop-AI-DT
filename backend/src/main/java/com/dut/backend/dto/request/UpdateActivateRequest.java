package com.dut.backend.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UpdateActivateRequest {
    private Long accountId;
    private boolean isActive;
}
