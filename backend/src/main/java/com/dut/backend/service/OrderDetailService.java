package com.dut.backend.service;

import com.dut.backend.entity.OrderDetail;

import java.util.List;

public interface OrderDetailService {
    List<OrderDetail> getOrderDetailByOrderId(Long orderId);
}
