package com.dut.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MomoRequestDTO {
    private String partnerCode;
    private String partnerName;
    private String storeId;
    private String requestId;
    private long amount;
    private String orderId;
    private String orderInfo;
    private String redirectUrl;
    private String ipnUrl;
    private List<MomoItemDTO> items;
    private String lang;
    private String requestType;
    private boolean autoCapture;
    private String extraData;
    private String signature;
}

