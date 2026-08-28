package com.phsbrasil.formulariomaquinas.Controllers.Sharepoint;

import com.phsbrasil.formulariomaquinas.MicrosoftGraph.DTOs.EmpresaDTO;
import com.phsbrasil.formulariomaquinas.MicrosoftGraph.EmpresaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    private final EmpresaService service;

    public EmpresaController(EmpresaService service) {
        this.service = service;
    }

    /** GET /api/empresas?dominio=cliente.com.br -> { "nomeFantasia": "..." } (nomeFantasia null se nao achar). */
    @GetMapping
    public EmpresaDTO porDominio(@RequestParam String dominio) {
        return new EmpresaDTO(service.nomeFantasiaPorDominio(dominio));
    }
}
