package com.dut.backend.entity;

import com.dut.backend.entity.Enum.OrderStatus;
import com.dut.backend.entity.Enum.PaymentMethod;
import com.dut.backend.entity.Enum.ProductType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order extends EntityBase{
    private Integer totalPrice = 0;
    private String phoneNumber;
    private String address;
    private String orderCode;
    private boolean isPaid = false;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod = PaymentMethod.SHIPCODE;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;
    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;
}
