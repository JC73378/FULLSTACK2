package com.funkostore.notifications.config;

import com.funkostore.notifications.model.Notification;
import com.funkostore.notifications.model.NotificationTemplate;
import com.funkostore.notifications.repository.NotificationRepository;
import com.funkostore.notifications.repository.NotificationTemplateRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Instant;
import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner seedNotifications(NotificationRepository notificationRepository,
                                        NotificationTemplateRepository templateRepository) {
        return args -> {
            if (templateRepository.count() == 0) {
                NotificationTemplate t1 = new NotificationTemplate();
                t1.setCode("WELCOME");
                t1.setSubject("Bienvenido a FunkoStore");
                t1.setBody("Hola {{email}}, gracias por registrarte.");

                NotificationTemplate t2 = new NotificationTemplate();
                t2.setCode("ORDER_PAID");
                t2.setSubject("Pedido pagado");
                t2.setBody("Tu pedido ha sido pagado correctamente.");

                templateRepository.saveAll(List.of(t1, t2));
            }

            if (notificationRepository.count() == 0) {
                Notification n = new Notification();
                n.setUserEmail("demo@funkostore.com");
                n.setType("INFO");
                n.setUrgency("LOW");
                n.setDetail("Tenemos nuevas ofertas en Sanrio.");
                n.setStatus("SENT");
                n.setSentAt(Instant.now());
                notificationRepository.save(n);
            }
        };
    }
}
