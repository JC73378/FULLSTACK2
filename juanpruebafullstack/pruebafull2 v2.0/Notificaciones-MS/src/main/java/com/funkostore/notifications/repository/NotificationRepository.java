package com.funkostore.notifications.repository;

import com.funkostore.notifications.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> { }
