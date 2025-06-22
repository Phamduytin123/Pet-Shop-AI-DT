package com.dut.backend.service;

import com.dut.backend.dto.request.AddCartRequest;
import com.dut.backend.dto.request.UpdateCartRequest;
import com.dut.backend.entity.Account;
import com.dut.backend.entity.ShoppingCart;
import org.apache.coyote.BadRequestException;

import java.util.List;

public interface ShoppingCartService {
    ShoppingCart addShoppingCart(AddCartRequest addCartRequest, Account account) throws BadRequestException;
    List<ShoppingCart> getListCartByAccountId(Long accountId);
    ShoppingCart updateShoppingCart(UpdateCartRequest request) throws BadRequestException;
    void deleteShoppingCart(Long cartId) throws BadRequestException;
}
