package com.dut.backend.entity.Enum;

public enum PaymentMethod {
    SHIPCODE, MOMO;
    public int getIndex() {
        return switch (this) {
            case SHIPCODE -> 0;
            case MOMO -> 1;
        };
    }
}
