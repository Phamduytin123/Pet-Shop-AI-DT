package com.dut.backend.service.Impl;

import com.dut.backend.dto.request.AddCartRequest;
import com.dut.backend.entity.Account;
import com.dut.backend.entity.ItemBase;
import com.dut.backend.entity.ShoppingCart;
import com.dut.backend.repository.AccountRepository;
import com.dut.backend.repository.ItemBaseRepository;
import com.dut.backend.repository.ShoppingCartRepository;
import com.dut.backend.service.ShoppingCartService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {
    private final ShoppingCartRepository shoppingCartRepository;
    private final AccountRepository accountRepository;
    private final ItemBaseRepository itemBaseRepository;
    @Override
    public ShoppingCart addShoppingCart(AddCartRequest addCartRequest, Account account) throws BadRequestException {
        ItemBase item = itemBaseRepository.findById(addCartRequest.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found"));
        ShoppingCart foundedCart = shoppingCartRepository.findByAccountIdAndItemId(account.getId(),item.getId()).orElse(null);
        if (foundedCart != null) {
            throw new BadRequestException("Item was added to shopping cart !!!");
        }
        ShoppingCart cart = ShoppingCart.builder()
                .account(account)
                .item(item)
                .quantity(addCartRequest.getQuantity())
                .build();
        return shoppingCartRepository.save(cart);
    }

    @Override
    public List<ShoppingCart> getListCartByAccountId(Long accountId) {
        return shoppingCartRepository.findByAccountId(accountId);
    }
}
