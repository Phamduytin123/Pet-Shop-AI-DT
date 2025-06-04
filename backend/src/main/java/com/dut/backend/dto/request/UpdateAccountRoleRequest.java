package com.dut.backend.dto.request;

import com.dut.backend.entity.Enum.AccountRole;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UpdateAccountRoleRequest {
    private Long accountId;
    private AccountRole role;
}
