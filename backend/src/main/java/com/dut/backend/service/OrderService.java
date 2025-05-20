package com.dut.backend.service;

import com.dut.backend.dto.request.CreateOrderRequest;
import com.dut.backend.dto.response.MomoResponseDTO;
import com.dut.backend.entity.Account;
import com.dut.backend.entity.Order;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface OrderService {
    MomoResponseDTO addOrderByCarts (CreateOrderRequest createOrderRequest, Account account) throws Exception;
    List<Order> getOrdersByIdAccount(Long accountId);
    Order callback(Map<String, Object> responseBody);
}
