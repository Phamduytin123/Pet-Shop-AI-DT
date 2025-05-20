package com.dut.backend.dto.response;

import lombok.Data;

@Data
public class MomoResponseDTO {
    private String partnerCode;
    private String orderId;
    private String requestId;
    private int amount;
    private long responseTime;
    private String message;
    private int resultCode;
    private String payUrl;
    private String shortLink;
}