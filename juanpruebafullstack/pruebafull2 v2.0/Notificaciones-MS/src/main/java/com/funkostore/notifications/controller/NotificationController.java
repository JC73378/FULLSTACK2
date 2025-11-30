package com.funkostore.notifications.controller;

import com.funkostore.notifications.model.Notification;
import com.funkostore.notifications.model.NotificationTemplate;
import com.funkostore.notifications.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<Notification> all() { return notificationService.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Notification> byId(@PathVariable Long id) {
        return notificationService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Notification> create(@RequestBody Notification n) {
        Notification saved = notificationService.save(n);
        return ResponseEntity.created(URI.create("/api/v1/notifications/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notification> update(@PathVariable Long id, @RequestBody Notification n) {
        return notificationService.findById(id)
                .map(existing -> {
                    n.setId(existing.getId());
                    return ResponseEntity.ok(notificationService.save(n));
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        notificationService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/send")
    public ResponseEntity<Notification> send(@RequestBody Notification n) {
        return ResponseEntity.ok(notificationService.send(n));
    }

    @GetMapping("/templates")
    public List<NotificationTemplate> templates() { return notificationService.templates(); }

    @PostMapping("/templates")
    public NotificationTemplate saveTemplate(@RequestBody NotificationTemplate t) { return notificationService.saveTemplate(t); }
}
