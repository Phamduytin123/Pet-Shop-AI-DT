package com.dut.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MomoItemDTO {
    private String name;
    private int quantity;
    private long price;
    private String imageUrl;
}

