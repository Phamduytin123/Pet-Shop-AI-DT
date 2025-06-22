package com.dut.backend.entity.Enum;

public enum OrderStatus {
    PENDING,
    CONFIRMED,
    PREPARING,
    DELIVERING,
    DELIVERED,
    COMPLETED,
    CANCELLED;
    public int getIndex() {
        return switch (this) {
            case PENDING -> 0;
            case CONFIRMED -> 1;
            case PREPARING -> 2;
            case DELIVERING -> 3;
            case DELIVERED -> 4;
            case COMPLETED -> 5;
            case CANCELLED -> 6;
        };
    }
}
