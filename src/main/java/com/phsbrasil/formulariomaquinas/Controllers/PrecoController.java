package com.phsbrasil.formulariomaquinas.Controllers;

import com.phsbrasil.formulariomaquinas.db.PrecoAcronisDTO;
import com.phsbrasil.formulariomaquinas.db.PrecoService;
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
@RequestMapping("/api/precos")
public class PrecoController {

    @Autowired
    private PrecoService service;

    @GetMapping("/{id}")
    public PrecoAcronisDTO buscarPreco(@PathVariable Long id) {
        return service.buscarPorId(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Preco nao encontrado"));
    }

    @GetMapping("/all")
    public List<PrecoAcronisDTO> obterTodos(@RequestParam int limit, @RequestParam int offset) {
        List<PrecoAcronisDTO> precos = service.listar(limit, offset);

        if (precos.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "Nenhum preco encontrado");
        }
        return precos;
    }
}
