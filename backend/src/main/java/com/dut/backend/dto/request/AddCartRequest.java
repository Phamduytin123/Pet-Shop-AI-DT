package com.dut.backend.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AddCartRequest {
    private Long itemId;
    private Integer quantity = 1;
}
