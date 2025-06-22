package com.dut.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UpdatePaymentStatus {
    @NotNull
    private Long orderId;
    @NotNull
    private boolean isPaid;
}
