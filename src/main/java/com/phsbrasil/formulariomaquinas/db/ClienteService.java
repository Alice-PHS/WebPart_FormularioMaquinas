package com.phsbrasil.formulariomaquinas.db;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    public Optional<ClienteAcronisDTO> buscarPorId(Long id) {
        return repository.buscarPorId(id)
                .map(ClienteAcronisDTO::fromModel);
    }

    public List<ClienteAcronisDTO> listar(int limit, int offset) {
        return repository.obterTodos(limit, offset)
                .stream()
                .map(ClienteAcronisDTO::fromModel)
                .toList();
    }
}
