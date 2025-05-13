package com.dut.backend.entity.Enum;

public enum ItemType {
    Pet, Product;

    public int getIndex() {
        return switch (this) {
            case Pet -> 0;
            case Product -> 1;
        };
    }
}
