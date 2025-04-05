package com.dut.backend.entity.Enum;

public enum ProductType {
    Toy, Food;

    public int getIndex() {
        return switch (this) {
            case Toy -> 0;
            case Food -> 1;
        };
    }
}
