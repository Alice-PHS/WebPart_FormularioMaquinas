package com.phsbrasil.formulariomaquinas.Controllers;

import com.phsbrasil.formulariomaquinas.db.ClienteAcronisDTO;
import com.phsbrasil.formulariomaquinas.db.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService service;

    @GetMapping("/{id}")
    public ClienteAcronisDTO buscarCliente(@PathVariable Long id) {
        return service.buscarPorId(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente nao encontrado"));
    }

    @GetMapping("/all")
    public List<ClienteAcronisDTO> obterTodos(@RequestParam int limit, @RequestParam int offset) {
        List<ClienteAcronisDTO> clientes = service.listar(limit, offset);

        if (clientes.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "Nenhum cliente encontrado");
        }
        return clientes;
    }
}
