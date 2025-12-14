package com.funkostore.backend.comingsoon;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.funkostore.backend.comingsoon.dto.ComingSoonResponse;

@Service
@Transactional(readOnly = true)
public class ComingSoonService {

    private final ComingSoonRepository repository;

    public ComingSoonService(ComingSoonRepository repository) {
        this.repository = repository;
    }

    public List<ComingSoonResponse> listAll() {
        return repository.findAll().stream()
                .map(ComingSoonResponse::from)
                .toList();
    }
}
