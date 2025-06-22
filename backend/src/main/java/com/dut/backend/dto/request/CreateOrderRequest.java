package com.dut.backend.dto.request;

import com.dut.backend.common.util.CommonUtils;
import com.dut.backend.entity.Enum.OrderStatus;
import com.dut.backend.entity.Enum.PaymentMethod;
import com.dut.backend.entity.ItemBase;
import com.dut.backend.entity.ShoppingCart;
import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequest {
    private Integer totalPrice = 0;
    private String phoneNumber;
    private String address;
    private PaymentMethod paymentMethod = PaymentMethod.SHIPCODE;
    private OrderStatus status = OrderStatus.PENDING;
    private List<AddCartRequest> listItems ;
}
