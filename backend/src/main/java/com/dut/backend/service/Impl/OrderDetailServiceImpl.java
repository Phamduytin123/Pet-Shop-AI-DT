package com.dut.backend.service.Impl;

import com.dut.backend.entity.OrderDetail;
import com.dut.backend.repository.OrderDetailRepository;
import com.dut.backend.service.OrderDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class OrderDetailServiceImpl implements OrderDetailService {
    private final OrderDetailRepository orderDetailRepository;
    @Override
    public List<OrderDetail> getOrderDetailByOrderId(Long orderId) {
        return orderDetailRepository.findByOrderId(orderId);
    }
}
