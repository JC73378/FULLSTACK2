package com.funkostore.backend.order;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.funkostore.backend.common.BadRequestException;
import com.funkostore.backend.common.NotFoundException;
import com.funkostore.backend.order.dto.CreateOrderRequest;
import com.funkostore.backend.order.dto.CustomerDto;
import com.funkostore.backend.order.dto.OrderItemRequest;
import com.funkostore.backend.order.dto.OrderResponse;
import com.funkostore.backend.product.Product;
import com.funkostore.backend.product.ProductRepository;

@Service
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> listOrders(OrderStatus status, String email) {
        List<CustomerOrder> orders = (email != null && !email.isBlank())
                ? orderRepository.findByCustomerEmailIgnoreCase(email)
                : orderRepository.findAll();
        return orders.stream()
                .filter(order -> status == null || order.getStatus() == status)
                .map(OrderResponse::from)
                .toList();
    }

    public OrderResponse createOrder(CreateOrderRequest request) {
        Map<Long, Integer> groupedItems = request.items().stream()
                .collect(Collectors.toMap(OrderItemRequest::productId, OrderItemRequest::quantity, Integer::sum));
        if (groupedItems.isEmpty()) {
            throw new BadRequestException("La orden debe tener items");
        }

        Map<Long, Product> productsById = productRepository.findAllById(groupedItems.keySet()).stream()
                .collect(Collectors.toMap(Product::getId, Function.identity()));
        if (productsById.size() != groupedItems.size()) {
            throw new BadRequestException("Algun producto no existe");
        }

        CustomerOrder order = new CustomerOrder();
        CustomerDto customer = request.customer();
        order.setCustomerName(customer.fullName());
        order.setCustomerEmail(customer.email());
        order.setCustomerAddress(customer.address());

        BigDecimal total = BigDecimal.ZERO;
        for (Map.Entry<Long, Integer> entry : groupedItems.entrySet()) {
            Product product = productsById.get(entry.getKey());
            int qty = entry.getValue();
            if (!product.isActive()) {
                throw new BadRequestException("Producto " + product.getName() + " no esta activo");
            }
            if (product.getStock() < qty) {
                throw new BadRequestException("Stock insuficiente para " + product.getName());
            }
            product.setStock(product.getStock() - qty);

            OrderItem item = new OrderItem();
            item.setProductId(product.getId());
            item.setProductName(product.getName());
            item.setQuantity(qty);
            item.setUnitPrice(product.getPrice());
            order.addItem(item);

            total = total.add(product.getPrice().multiply(BigDecimal.valueOf(qty)));
        }
        order.setTotal(total);

        CustomerOrder saved = orderRepository.save(order);
        productRepository.saveAll(productsById.values());
        return OrderResponse.from(saved);
    }

    public OrderResponse updateStatus(Long id, OrderStatus newStatus) {
        if (newStatus == null) {
            throw new BadRequestException("Estado invalido");
        }
        CustomerOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Orden no encontrada"));
        order.setStatus(newStatus);
        return OrderResponse.from(orderRepository.save(order));
    }
}
