package com.dut.backend.dto.response;

import com.dut.backend.dto.request.AddCartRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MomoExtraDataDTO {
    private List<AddCartRequest> items;
    private Long accountId;
    private String paymentCode;
    private Long orderId;
}
