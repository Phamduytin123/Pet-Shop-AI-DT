package com.dut.backend.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UpdateCartRequest {
    private Long cartId;
    private Integer quantity;
}
