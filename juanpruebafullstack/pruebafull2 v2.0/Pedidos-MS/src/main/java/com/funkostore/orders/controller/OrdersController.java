package com.funkostore.orders.controller;

import com.funkostore.orders.model.Cart;
import com.funkostore.orders.model.CartItem;
import com.funkostore.orders.model.Order;
import com.funkostore.orders.model.SupportTicket;
import com.funkostore.orders.service.OrdersService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v2/orders")
public class OrdersController {

    private final OrdersService ordersService;

    public OrdersController(OrdersService ordersService) {
        this.ordersService = ordersService;
    }

    @PostMapping("/cart")
    public ResponseEntity<Cart> createCart(@RequestBody Map<String, Long> payload) {
        Long userId = payload.getOrDefault("userId", 0L);
        Cart cart = ordersService.createCart(userId);
        return ResponseEntity.created(URI.create("/api/v1/orders/cart/" + cart.getId())).body(cart);
    }

    @PostMapping("/cart/{id}/items")
    public ResponseEntity<CartItem> addItem(@PathVariable Long id, @RequestBody CartItem item) {
        CartItem saved = ordersService.addItem(id, item);
        return ResponseEntity.created(URI.create("/api/v1/orders/cart/" + id + "/items/" + saved.getId())).body(saved);
    }

    @DeleteMapping("/cart/items/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long itemId) {
        ordersService.removeItem(itemId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/checkout/{cartId}")
    public ResponseEntity<Order> checkout(@PathVariable Long cartId) {
        Order order = ordersService.checkout(cartId);
        return ResponseEntity.created(URI.create("/api/v1/orders/" + order.getId())).body(order);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> orderById(@PathVariable Long id) {
        return ordersService.findOrder(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/by-user/{userId}")
    public List<Order> ordersByUser(@PathVariable Long userId) {
        return ordersService.findOrdersByUser(userId);
    }

    // Tickets
    @PostMapping("/tickets")
    public ResponseEntity<SupportTicket> createTicket(@RequestBody SupportTicket ticket) {
        SupportTicket saved = ordersService.createTicket(ticket);
        return ResponseEntity.created(URI.create("/api/v1/orders/tickets/" + saved.getId())).body(saved);
    }

    @GetMapping("/tickets")
    public List<SupportTicket> allTickets() { return ordersService.allTickets(); }

    @GetMapping("/tickets/{id}")
    public ResponseEntity<SupportTicket> ticketById(@PathVariable Long id) {
        return ordersService.findTicket(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/tickets/by-user/{email}")
    public List<SupportTicket> ticketsByUser(@PathVariable String email) { return ordersService.ticketsByUser(email); }

    @PutMapping("/tickets/{id}")
    public ResponseEntity<SupportTicket> updateTicket(@PathVariable Long id, @RequestBody SupportTicket ticket) {
        return ordersService.findTicket(id)
                .map(existing -> {
                    ticket.setId(existing.getId());
                    return ResponseEntity.ok(ordersService.updateTicket(ticket));
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/tickets/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
        ordersService.deleteTicket(id);
        return ResponseEntity.noContent().build();
    }
}
