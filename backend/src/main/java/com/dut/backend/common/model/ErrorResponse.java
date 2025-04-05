package com.dut.backend.common.model;

import com.dut.backend.annotation.json.JsonSnakeCaseNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@JsonSnakeCaseNaming
public class ErrorResponse {
    private String code;
    private String message;
}
