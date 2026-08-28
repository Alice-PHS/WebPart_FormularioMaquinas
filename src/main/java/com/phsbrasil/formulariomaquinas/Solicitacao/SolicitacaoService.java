package com.phsbrasil.formulariomaquinas.Solicitacao;

import com.phsbrasil.formulariomaquinas.MicrosoftGraph.GraphMailService;
import com.phsbrasil.formulariomaquinas.Solicitacao.dto.SolicitacaoRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Porta do Power Automate "Formulario de Maquinas" — SEM a etapa de aprovacao.
 *
 * Ordem (igual ao flow, menos a aprovacao):
 *   1. INSERT em tblGestaoEquipamentos_Log
 *   2. se o chamado existe em tblChamado:
 *        - INSERT em tblChamado_Interacao (comentario montado por tipo)
 *        - UPDATE tblChamado.Cha_Status = 1
 *   3. se o chamado NAO existe:
 *        - e-mail de notificacao para o time (destinatario por tipo)
 */
@Service
public class SolicitacaoService {

    private static final Logger log = LoggerFactory.getLogger(SolicitacaoService.class);

    private final LogRepository logRepository;
    private final ChamadoRepository chamadoRepository;
    private final GraphMailService mailService;

    @Value("${phs.mail.to.inclusao:suporte@phsbrasil.com.br}")
    private String toInclusao;
    @Value("${phs.mail.to.exclusao:financeiro@phsbrasil.com.br}")
    private String toExclusao;
    @Value("${phs.mail.to.substituicao:suporte@phsbrasil.com.br}")
    private String toSubstituicao;
    @Value("${phs.mail.to.novousuario:suporte@phsbrasil.com.br}")
    private String toNovoUsuario;

    public SolicitacaoService(LogRepository logRepository,
                              ChamadoRepository chamadoRepository,
                              GraphMailService mailService) {
        this.logRepository = logRepository;
        this.chamadoRepository = chamadoRepository;
        this.mailService = mailService;
    }

    public void processar(SolicitacaoRequest req) {
        Integer codigo = chamadoRepository.parseCodigo(nvl(req.numeroChamado())).orElse(null);

        // 1. LOG (sempre)
        try {
            logRepository.inserir(req.empresa(), req.tipoFormulario(), req.solicitanteEmail(), codigo);
        } catch (RuntimeException e) {
            log.error("Falha ao gravar tblGestaoEquipamentos_Log: {}", e.getMessage());
        }

        // 2/3. chamado existe -> interacao + status; senao -> e-mail.
        // O flow ja respondeu ao front antes desta parte: uma falha aqui e logada,
        // nao vira 500 pro formulario.
        try {
            String comentario = ComentarioBuilder.build(req);
            boolean existe = codigo != null && chamadoRepository.existeChamado(codigo);
            if (existe) {
                chamadoRepository.registrarInteracaoEConcluir(codigo, comentario, nvl(req.solicitante()));
            } else {
                mailService.enviarHtml(
                        destinatario(req.tipoFormulario()),
                        ComentarioBuilder.assunto(req.tipoFormulario()),
                        ComentarioBuilder.corpoHtml(req));
            }
        } catch (RuntimeException e) {
            log.error("Falha ao processar solicitacao (chamado={}, tipo={}): {}",
                    codigo, req.tipoFormulario(), e.getMessage(), e);
        }
    }

    private String destinatario(String tipo) {
        return switch (tipo == null ? "" : tipo) {
            case "inclusao" -> toInclusao;
            case "exclusao" -> toExclusao;
            case "substituicao" -> toSubstituicao;
            case "novoUsuario" -> toNovoUsuario;
            default -> toInclusao;
        };
    }

    private static String nvl(String v) {
        return v == null ? "" : v;
    }

    public Map<String, String> respostaOk() {
        return Map.of("status", "success", "message", "Formulário recebido com sucesso");
    }
}
