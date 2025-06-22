package com.dut.backend.controller;

import com.dut.backend.annotation.auth.CurrentAccount;
import com.dut.backend.annotation.auth.PreAuthorizeCustomer;
import com.dut.backend.common.model.AbstractResponse;
import com.dut.backend.dto.request.AddCartRequest;
import com.dut.backend.dto.request.UpdateCartRequest;
import com.dut.backend.entity.Account;
import com.dut.backend.entity.ShoppingCart;
import com.dut.backend.service.ShoppingCartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/shopping-carts")
public class ShoppingCartController {
    private final ShoppingCartService shoppingCartService;
    @PostMapping("/add")
    @PreAuthorizeCustomer
    public ResponseEntity<AbstractResponse> addCart(@RequestBody AddCartRequest request, @CurrentAccount Account account) {
        try {
            ShoppingCart cart = shoppingCartService.addShoppingCart(request,account);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(cart));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @GetMapping()
    @PreAuthorizeCustomer
    public ResponseEntity<AbstractResponse> getShoppingCart(@CurrentAccount Account account) {
        try {
            List<ShoppingCart> carts = shoppingCartService.getListCartByAccountId(account.getId());
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(carts));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @PutMapping("/update")
    @PreAuthorizeCustomer
    public ResponseEntity<AbstractResponse> updateShoppingCart(@RequestBody UpdateCartRequest request) {
        try {
            var result = shoppingCartService.updateShoppingCart(request);
            return ResponseEntity.ok(AbstractResponse.successWithoutMeta(result));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
    @DeleteMapping("/delete")
    @PreAuthorizeCustomer
    public ResponseEntity<AbstractResponse> deleteShoppingCart(@RequestParam("cartId") Long cartId) {
        try {
            shoppingCartService.deleteShoppingCart(cartId);
            return ResponseEntity.ok(AbstractResponse.successWithoutMetaAndData());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(AbstractResponse.error(e.getMessage()));
        }
    }
}
