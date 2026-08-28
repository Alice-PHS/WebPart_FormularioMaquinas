package com.phsbrasil.formulariomaquinas.Controllers.Sharepoint;

import com.phsbrasil.formulariomaquinas.MicrosoftGraph.DTOs.UnidadeDTO;
import com.phsbrasil.formulariomaquinas.MicrosoftGraph.UnidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/unidades")
public class UnidadeController {

    @Autowired
    private UnidadeService service;

    @GetMapping("/all")
    public List<UnidadeDTO> obterTodasUnidades() {
        List<UnidadeDTO> unidades = service.getAllUnidades();

        if (unidades.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "Nenhuma unidade encontrada");
        }

        return unidades;
    }
}