package com.funkostore.orders.service;

import com.funkostore.orders.model.*;
import com.funkostore.orders.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrdersService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final SupportTicketRepository supportTicketRepository;

    public OrdersService(CartRepository cartRepository, CartItemRepository cartItemRepository,
                         OrderRepository orderRepository, OrderItemRepository orderItemRepository,
                         SupportTicketRepository supportTicketRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.supportTicketRepository = supportTicketRepository;
    }

    public Cart createCart(Long userId) {
        Cart cart = new Cart();
        cart.setUserId(userId);
        return cartRepository.save(cart);
    }

    public Optional<Cart> findCart(Long id) { return cartRepository.findById(id); }

    @Transactional
    public CartItem addItem(Long cartId, CartItem item) {
        Cart cart = cartRepository.findById(cartId).orElseThrow();
        item.setCart(cart);
        return cartItemRepository.save(item);
    }

    public void removeItem(Long itemId) { cartItemRepository.deleteById(itemId); }

    @Transactional
    public Order checkout(Long cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow();
        Order order = new Order();
        order.setUserId(cart.getUserId());
        order.setStatus("PAID");
        Order savedOrder = orderRepository.save(order);

        double total = 0.0;
        for (CartItem ci : cart.getItems()) {
            OrderItem oi = new OrderItem();
            oi.setOrder(savedOrder);
            oi.setProductId(ci.getProductId());
            oi.setQuantity(ci.getQuantity());
            oi.setUnitPrice(ci.getUnitPrice());
            total += ci.getQuantity() * ci.getUnitPrice();
            orderItemRepository.save(oi);
        }
        savedOrder.setTotal(total);
        return orderRepository.save(savedOrder);
    }

    public Optional<Order> findOrder(Long id) { return orderRepository.findById(id); }
    public List<Order> findOrdersByUser(Long userId) { return orderRepository.findByUserId(userId); }

    // Tickets
    public SupportTicket createTicket(SupportTicket t) { return supportTicketRepository.save(t); }
    public Optional<SupportTicket> findTicket(Long id) { return supportTicketRepository.findById(id); }
    public List<SupportTicket> ticketsByUser(String email) { return supportTicketRepository.findByUserEmail(email); }
    public List<SupportTicket> allTickets() { return supportTicketRepository.findAll(); }
    public SupportTicket updateTicket(SupportTicket t) { return supportTicketRepository.save(t); }
    public void deleteTicket(Long id) { supportTicketRepository.deleteById(id); }
}
