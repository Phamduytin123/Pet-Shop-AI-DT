package com.dut.backend.dto.response;

import com.dut.backend.annotation.json.JsonSnakeCaseNaming;
import com.dut.backend.common.constant.CommonConstants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonSnakeCaseNaming
public class CredentialResponse {
    private String token;
    private String type = CommonConstants.JWT_TYPE;
}
