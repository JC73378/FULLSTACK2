package com.funkostore.orders.repository;

import com.funkostore.orders.model.SupportTicket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {
    List<SupportTicket> findByUserEmail(String userEmail);
}
