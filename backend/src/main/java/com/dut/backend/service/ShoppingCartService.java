package com.dut.backend.service;

import com.dut.backend.dto.request.AddCartRequest;
import com.dut.backend.entity.Account;
import com.dut.backend.entity.ShoppingCart;

import java.util.List;

public interface ShoppingCartService {
    ShoppingCart addShoppingCart(AddCartRequest addCartRequest, Account account);
    List<ShoppingCart> getListCartByAccountId(Long accountId);
}
