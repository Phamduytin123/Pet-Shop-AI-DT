package com.dut.backend.controller;

import com.dut.backend.annotation.auth.CurrentAccount;
import com.dut.backend.annotation.auth.PreAuthorizeAll;
import com.dut.backend.annotation.auth.PreAuthorizeAllWithoutCustomer;
import com.dut.backend.annotation.auth.PreAuthorizeCustomer;
import com.dut.backend.common.model.AbstractResponse;
import com.dut.backend.dto.request.CreateOrderRequest;
import com.dut.backend.dto.request.UpdateOrderStatusRequest;
import com.dut.backend.dto.request.UpdatePaymentStatus;
import com.dut.backend.entity.Account;
import com.dut.backend.entity.Order;
import com.dut.backend.service.OrderDetailService;
import com.dut.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
public class OrderController {
    private final OrderService orderService;
    private final OrderDetailService orderDetailService;
    @GetMapping()
    @PreAuthorizeCustomer
    public ResponseEntity<AbstractResponse> getOrders(@CurrentAccount Account account) {
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(
                orderService.getOrdersByIdAccount(account.getId())
        ));
    }
    @GetMapping("/{orderId}")
    @PreAuthorizeAll
    public ResponseEntity<AbstractResponse> getOrderDetail(@PathVariable Long orderId) {
        System.out.println(orderId);
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(
                orderDetailService.getOrderDetailByOrderId(orderId)
        ));
    }
    @PostMapping("/create")
    @PreAuthorizeCustomer
    public ResponseEntity<AbstractResponse> createOrder(@RequestBody CreateOrderRequest request, @CurrentAccount Account account) {
        try {
            var result = orderService.addOrderByCarts(request, account);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
        } catch (BadRequestException e) {
            return ResponseEntity.status(400).body(AbstractResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @PostMapping("/createPayment")
    @PreAuthorizeCustomer
    public ResponseEntity<AbstractResponse> createPaymentByOrder(@RequestParam("orderId") Long orderId, @CurrentAccount Account account) {
        try {
            var result = orderService.createPaymentByOrder(orderId, account);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
        } catch (BadRequestException e) {
            return ResponseEntity.status(400).body(AbstractResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @PostMapping("/callback")
    public ResponseEntity<AbstractResponse> callback(@RequestBody Map<String, Object> responseBody) {
        try {
            var result = orderService.callback(responseBody);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @GetMapping("/alls")
    @PreAuthorizeAllWithoutCustomer
    public ResponseEntity<AbstractResponse> getAllOrders() {
        var result = orderService.getAllOrdersSortedByCreatedAtDesc();
        return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
    }
    @PutMapping("/updateStatus")
    @PreAuthorizeAllWithoutCustomer
    public ResponseEntity<AbstractResponse> updateOrderStatus(@RequestBody UpdateOrderStatusRequest request) throws Exception {
        try {
            var result = orderService.UpdateOrderStatus(request);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @PutMapping("/updatePaymentStatus")
    @PreAuthorizeAllWithoutCustomer
    public ResponseEntity<AbstractResponse> updatePaymentStatus(@RequestBody UpdatePaymentStatus request) throws Exception {
        try {
            System.out.println(request);
            var result = orderService.UpdatePaymentStatus(request);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @PutMapping("/cancel")
    @PreAuthorizeCustomer
    public ResponseEntity<AbstractResponse> cancelOrderById(@RequestParam("orderId") Long orderId) {
        try {
            var result = orderService.CancelOrder(orderId);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
        } catch (BadRequestException e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
}
