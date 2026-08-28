package com.phsbrasil.formulariomaquinas.Solicitacao;

import com.phsbrasil.formulariomaquinas.Solicitacao.dto.SolicitacaoRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Substitui o Power Automate: os 4 formularios (inclusao/exclusao/substituicao/novoUsuario)
 * fazem POST aqui, com `tipoFormulario` no corpo.
 */
@RestController
@RequestMapping("/api/solicitacoes")
public class SolicitacaoController {

    private final SolicitacaoService service;

    public SolicitacaoController(SolicitacaoService service) {
        this.service = service;
    }

    @PostMapping
    public Map<String, String> receber(@RequestBody SolicitacaoRequest req) {
        service.processar(req);
        return service.respostaOk();
    }
}
