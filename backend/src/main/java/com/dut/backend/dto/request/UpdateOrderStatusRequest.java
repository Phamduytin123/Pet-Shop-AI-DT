package com.dut.backend.dto.request;

import com.dut.backend.entity.Enum.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UpdateOrderStatusRequest {
    @NotNull
    private Long orderId;
    @NotNull
    private OrderStatus status;
}
