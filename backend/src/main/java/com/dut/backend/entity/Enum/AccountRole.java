package com.dut.backend.entity.Enum;

public enum AccountRole {
    ADMIN, CUSTOMER, SELLER;

    public int getIndex() {
        return switch (this) {
            case ADMIN -> 0;
            case CUSTOMER -> 1;
            case SELLER -> 2;
        };
    }
}
