package com.dut.backend.dto.response;

import com.dut.backend.annotation.json.JsonSnakeCaseNaming;
import com.dut.backend.common.model.AbstractDTO;
import com.dut.backend.entity.Account;
import com.dut.backend.entity.Enum.AccountRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@JsonSnakeCaseNaming
public class AccountInfo  extends AbstractDTO<Account> {
    private String email;
    private String fullName;
    private String avatar;
    private AccountRole role;
    private String phoneNumber;
    private String address;

    @Override
    public AccountInfo fromEntity(Account entity) {
        return AccountInfo.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .fullName(entity.getFullName())
                .phoneNumber(entity.getPhoneNumber())
                .address(entity.getAddress())
                .role(entity.getRole())
                .avatar(entity.getAvatarUrl())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .deletedAt(entity.getDeletedAt())
                .build();
    }
}
