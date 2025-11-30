package com.funkostore.notifications.service;

import com.funkostore.notifications.model.Notification;
import com.funkostore.notifications.model.NotificationTemplate;
import com.funkostore.notifications.repository.NotificationRepository;
import com.funkostore.notifications.repository.NotificationTemplateRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationTemplateRepository templateRepository;

    public NotificationService(NotificationRepository notificationRepository, NotificationTemplateRepository templateRepository) {
        this.notificationRepository = notificationRepository;
        this.templateRepository = templateRepository;
    }

    public List<Notification> findAll() { return notificationRepository.findAll(); }
    public Optional<Notification> findById(Long id) { return notificationRepository.findById(id); }
    public Notification save(Notification n) { return notificationRepository.save(n); }
    public void delete(Long id) { notificationRepository.deleteById(id); }

    public Notification send(Notification n) {
        n.setStatus("SENT");
        n.setSentAt(Instant.now());
        return notificationRepository.save(n);
    }

    public List<NotificationTemplate> templates() { return templateRepository.findAll(); }
    public Optional<NotificationTemplate> findTemplate(Long id) { return templateRepository.findById(id); }
    public NotificationTemplate saveTemplate(NotificationTemplate t) { return templateRepository.save(t); }
}
