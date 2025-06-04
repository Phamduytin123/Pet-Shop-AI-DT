package com.dut.backend.service.Impl;

import com.dut.backend.dto.request.*;
import com.dut.backend.dto.response.MomoExtraDataDTO;
import com.dut.backend.dto.response.MomoResponseDTO;
import com.dut.backend.entity.*;
import com.dut.backend.entity.Enum.OrderStatus;
import com.dut.backend.repository.*;
import com.dut.backend.service.OrderService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Hex;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {

    private final AccountRepository accountRepository;
    @Value("${momo.access-key}")
    private String accessKey;

    @Value("${momo.secret-key}")
    private String secretKey;

    @Value("${momo.endpoint.create}")
    private String momoEndpoint;

    @Value("${momo.partner-code}")
    private String partnerCode;

    @Value("${momo.redirect-url}")
    private String redirectUrl;

    @Value("${momo.ipn-url}")
    private String ipnUrl;

    private final OrderRepository orderRepository;
    private final ItemBaseRepository itemBaseRepository;
    private final ShoppingCartRepository shoppingCartRepository;
    private final OrderDetailRepository orderDetailRepository;
    @Override
    @Transactional
    public MomoResponseDTO addOrderByCarts(CreateOrderRequest createOrderRequest, Account account) throws Exception {

        Order order = Order.builder()
                .account(account)
                .address(createOrderRequest.getAddress())
                .phoneNumber(createOrderRequest.getPhoneNumber())
                .totalPrice(createOrderRequest.getTotalPrice())
                .status(OrderStatus.PENDING)
                .build();
        orderRepository.save(order);
//        System.out.println("oke lala"+order);
        int totalPrice = 0;
        List<MomoItemDTO> listMomoItems = new ArrayList<>();
        for (AddCartRequest item : createOrderRequest.getListItems()) {
            ItemBase itemBase = itemBaseRepository.findById(item.getItemId()).orElseThrow(()-> new BadRequestException("Can't find Item id: "+item.getItemId()));
            OrderDetail orderDetail = OrderDetail.builder()
                    .item(itemBase)
                    .quantity(item.getQuantity())
                    .order(order)
                    .build();
            orderDetailRepository.save(orderDetail);
//            System.out.println(orderDetail);
            totalPrice += item.getQuantity()*itemBase.getPrice();
            listMomoItems.add(MomoItemDTO.builder()
                            .price(itemBase.getPrice())
                            .quantity(item.getQuantity())
                            .name(itemBase.getName())
                            .imageUrl(itemBase.getImage())
                    .build());
            System.out.println("before call");
            ShoppingCart cart = shoppingCartRepository.findByAccountIdAndItemId(account.getId(),item.getItemId()).orElseThrow(() -> new BadRequestException("Can't find ShoppingCart"));
            System.out.println("before call2");
            System.out.println("cart: "+cart);
//            shoppingCartRepository.delete(cart);
        }
//        totalPrice = 10000;
        System.out.println("list items: "+listMomoItems);
        String orderId = "MOMO" + System.currentTimeMillis();
        String requestId = orderId;
        String orderInfo = "Thanh toán đơn hàng bằng MoMo";
        System.out.println("oke1");
        String extraData = Base64.getEncoder().encodeToString(
                new ObjectMapper().writeValueAsString(Map.of(
                        "items", createOrderRequest.getListItems(),
                        "accountId", account.getId(),
                        "paymentCode", orderId,
                        "orderId", order.getId()
                )).getBytes(StandardCharsets.UTF_8)
        );
        System.out.println("oke2");
        System.out.println("extra "+extraData);
        String rawSignature = String.format(
                "accessKey=%s&amount=%s&extraData=%s&ipnUrl=%s&orderId=%s&orderInfo=%s&partnerCode=%s&redirectUrl=%s&requestId=%s&requestType=%s",
                accessKey,
                10000,
                extraData,
                ipnUrl,
                orderId,
                orderInfo,
                partnerCode,
                redirectUrl,
                requestId,
                "payWithMethod"
        );

        // Tạo signature
        String signature = hmacSHA256(rawSignature, secretKey);
        System.out.println(signature);
        MomoRequestDTO momoRequestDTO = MomoRequestDTO.builder()
                .partnerCode(partnerCode)
                .partnerName("SpringBootShop")
                .storeId("SpringMomoStore")
                .requestId(requestId)
                .amount(10000)
                .orderId(orderId)
                .orderInfo(orderInfo)
                .redirectUrl(redirectUrl)
                .ipnUrl(ipnUrl)
                .extraData(extraData)
                .autoCapture(true)
                .signature(signature)
                .requestType("payWithMethod")
                .lang("vi")
                .items(listMomoItems)
                .build();
        //Send request
        System.out.println("request "+momoRequestDTO);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<MomoRequestDTO> request = new HttpEntity<>(momoRequestDTO, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<MomoResponseDTO> response = restTemplate.postForEntity(momoEndpoint, request, MomoResponseDTO.class);

        order.setTotalPrice(totalPrice);
        order.setOrderCode(orderId.replaceFirst("MOMO","").substring(0,8));
        System.out.println(order.getTotalPrice());
        orderRepository.save(order);
        System.out.println("Short link"+response.getBody().getShortLink());
        return response.getBody();
    }
    private String hmacSHA256(String data, String key) throws Exception {
        Mac hmac = Mac.getInstance("HmacSHA256");
        hmac.init(new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        return Hex.encodeHexString(hmac.doFinal(data.getBytes(StandardCharsets.UTF_8)));
    }
    @Override
    public List<Order> getOrdersByIdAccount(Long accountId) {
        return orderRepository.findByAccountId(accountId);
    }

    @Override
    public Order callback(Map<String, Object> responseBody) {
        boolean isPaid = true;
        if (!Objects.equals(responseBody.get("resultCode"), 0)) {
            System.out.println("Payment failed !!");
            isPaid = false;
        }
        String extraDataEncoded = (String) responseBody.get("extraData");
        byte[] decodedBytes = Base64.getDecoder().decode(extraDataEncoded);
        String decodedData = new String(decodedBytes, StandardCharsets.UTF_8);
        System.out.println(decodedData);
        try {
            ObjectMapper mapper = new ObjectMapper();
            MomoExtraDataDTO extraData = mapper.readValue(decodedData,MomoExtraDataDTO.class);
            System.out.println("Extra"+extraData);
            Order order = orderRepository.findById(extraData.getOrderId()).orElseThrow(
                    () -> new BadRequestException("Can't find Order")
            );
            order.setPaid(isPaid);
            System.out.println("Call back"+order);
            return orderRepository.save(order);
        } catch (Exception e) {
            System.out.println("Lỗi khi xử lý callback: " + e.getMessage());
            return null;
        }
    }

    @Override
    public List<Order> getAllOrdersSortedByCreatedAtDesc() {
        return orderRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public Order UpdateOrderStatus(UpdateOrderStatusRequest request) throws Exception {
        Order foundOrder = orderRepository.findById(request.getOrderId()).orElseThrow(
                () -> new BadRequestException("Can't find Order to update status")
        );
        foundOrder.setStatus(request.getStatus());
        return orderRepository.save(foundOrder);
    }
}
