package com.funkostore.backend.comingsoon;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.funkostore.backend.comingsoon.dto.ComingSoonResponse;

@RestController
@RequestMapping("/api/coming-soon")
public class ComingSoonController {

    private final ComingSoonService service;

    public ComingSoonController(ComingSoonService service) {
        this.service = service;
    }

    @GetMapping
    public List<ComingSoonResponse> list() {
        return service.listAll();
    }
}
