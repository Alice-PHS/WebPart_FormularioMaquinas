package com.phsbrasil.formulariomaquinas.MicrosoftGraph;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Porta do "buscarEmpresaPorDominio" do web part SPFx.
 *
 * SPFx fazia (SharePoint REST):
 *   _api/web/lists/getbytitle('Clientes')/items
 *      ?$select=Nome_x0020_fantasia,E_x002d_mail_x0028_Sponso
 *      &$filter=substringof('@dominio', E_x002d_mail_x0028_Sponso)
 *
 * Aqui: lê a lista "Clientes" via Microsoft Graph (GraphRepository) e filtra o
 * domínio em memória — o $filter por coluna nao indexada no Graph e fragil.
 * O resultado fica em cache (GraphRepository.getListItems e @Cacheable por listId).
 */
@Service
public class EmpresaService {

    private static final Logger log = LoggerFactory.getLogger(EmpresaService.class);

    private final GraphRepository graphRepository;

    @Value("${phs.sharepoint.site-id:}")
    private String siteId;

    @Value("${phs.sharepoint.clientes-list-id:}")
    private String clientesListId;

    @Value("${phs.sharepoint.clientes.campo-nome-fantasia:Nome_x0020_fantasia}")
    private String campoNomeFantasia;

    @Value("${phs.sharepoint.clientes.campo-email-sponsor:E_x002d_mail_x0028_Sponso}")
    private String campoEmailSponsor;

    public EmpresaService(GraphRepository graphRepository) {
        this.graphRepository = graphRepository;
    }

    /** Nome fantasia do cliente cujo e-mail de sponsor pertence ao dominio. null se nao achar / nao configurado. */
    public String nomeFantasiaPorDominio(String dominio) {
        if (siteId.isBlank() || clientesListId.isBlank() || dominio == null || dominio.isBlank()) {
            return null;
        }

        String alvo = ("@" + dominio).toLowerCase();

        try {
            List<Map<String, Object>> itens = graphRepository.getListItems(
                    siteId, clientesListId, campoNomeFantasia + "," + campoEmailSponsor);

            return itens.stream()
                    .filter(row -> String.valueOf(row.getOrDefault(campoEmailSponsor, ""))
                            .toLowerCase().contains(alvo))
                    .map(row -> String.valueOf(row.getOrDefault(campoNomeFantasia, "")))
                    .filter(s -> !s.isBlank() && !"null".equals(s))
                    .findFirst()
                    .orElse(null);
        } catch (RuntimeException e) {
            // Sem permissao no Graph, site/list errado, etc. -> mesmo comportamento tolerante do SPFx.
            log.warn("Falha ao consultar a lista Clientes (site={}, list={}): {}", siteId, clientesListId, e.getMessage());
            return null;
        }
    }
}
