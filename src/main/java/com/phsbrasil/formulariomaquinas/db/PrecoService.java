package com.phsbrasil.formulariomaquinas.db;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrecoService {

    private final PrecoRepository repository;

    public PrecoService(PrecoRepository repository) {
        this.repository = repository;
    }

    public Optional<PrecoAcronisDTO> buscarPorId(Long id) {
        return repository.buscarPorId(id)
                .map(PrecoAcronisDTO::fromModel);
    }

    public List<PrecoAcronisDTO> listar(int limit, int offset) {
        return repository.obterTodos(limit, offset)
                .stream()
                .map(PrecoAcronisDTO::fromModel)
                .toList();
    }
}
