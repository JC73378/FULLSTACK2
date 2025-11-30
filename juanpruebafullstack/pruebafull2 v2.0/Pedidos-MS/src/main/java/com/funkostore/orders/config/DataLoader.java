package com.funkostore.orders.config;

import com.funkostore.orders.model.SupportTicket;
import com.funkostore.orders.repository.SupportTicketRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner seedTickets(SupportTicketRepository ticketRepository) {
        return args -> {
            if (ticketRepository.count() == 0) {
                SupportTicket t1 = new SupportTicket();
                t1.setUserEmail("demo@funkostore.com");
                t1.setSubject("Problema con checkout");
                t1.setMessage("No pude completar el pago con mi tarjeta.");
                t1.setStatus("OPEN");
                ticketRepository.save(t1);

                SupportTicket t2 = new SupportTicket();
                t2.setUserEmail("seller@funkostore.com");
                t2.setSubject("Consulta de stock");
                t2.setMessage("Necesito agregar stock al producto 42.");
                t2.setStatus("OPEN");
                ticketRepository.save(t2);
            }
        };
    }
}
