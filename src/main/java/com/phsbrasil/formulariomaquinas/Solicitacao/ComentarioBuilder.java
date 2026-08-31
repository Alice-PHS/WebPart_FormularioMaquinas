package com.phsbrasil.formulariomaquinas.Solicitacao;

import com.phsbrasil.formulariomaquinas.Solicitacao.dto.SolicitacaoRequest;
import com.phsbrasil.formulariomaquinas.Solicitacao.dto.SolicitacaoRequest.EspecificacoesTecnicas;
import com.phsbrasil.formulariomaquinas.Solicitacao.dto.SolicitacaoRequest.MaquinaItem;
import com.phsbrasil.formulariomaquinas.Solicitacao.dto.SolicitacaoRequest.Substituicao;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Monta o ChI_Comentario. Textos identicos aos do flow (acoes "Inserir_linha_(V2)_*"),
 * com a diferenca de que, na inclusao, usuarios/e-mails/departamentos sao derivados
 * do array `maquinas[]` quando as strings nao vem preenchidas (o flow deixava em branco).
 */
public final class ComentarioBuilder {

    private ComentarioBuilder() {
    }

    public static String build(SolicitacaoRequest r) {
        String tipo = r.tipoFormulario() == null ? "" : r.tipoFormulario();
        return switch (tipo) {
            case "inclusao" -> inclusao(r);
            case "exclusao" -> exclusao(r);
            case "substituicao" -> substituicao(r);
            case "novoUsuario" -> novoUsuario(r);
            default -> "Solicitacao (" + tipo + ") da empresa " + s(r.empresa());
        };
    }

    private static String inclusao(SolicitacaoRequest r) {
        List<MaquinaItem> maquinas = safe(r.maquinas());
        boolean porMaquina = maquinas.stream().anyMatch(i -> i.especificacoesTecnicas() != null);
        if (!porMaquina) {
            return inclusaoAgregada(r);
        }

        StringBuilder sb = new StringBuilder("Eu, ").append(s(r.solicitante()))
                .append(", solicito a inclusão de ").append(maquinas.size())
                .append(" máquina(s) ao contrato de gerenciamento de rede da empresa ")
                .append(s(r.empresa())).append(".\n\nSeguem dados:\n\n");

        for (int i = 0; i < maquinas.size(); i++) {
            MaquinaItem item = maquinas.get(i);
            EspecificacoesTecnicas e = item.especificacoesTecnicas() != null ? item.especificacoesTecnicas() : espec(r);
            sb.append("MÁQUINA ").append(i + 1).append("\n")
                    .append("Nome completo do usuário: ").append(s(item.nomeUsuario())).append("\n")
                    .append("E-mail: ").append(s(item.email())).append("\n")
                    .append("Departamento: ").append(s(item.departamento())).append("\n")
                    .append("Pastas as quais serão acessadas: ").append(s(e.pastas())).append("\n")
                    .append("ID Team Viewer: ").append(s(e.teamViewer())).append("\n")
                    .append("ID AnyDesk: ").append(s(e.anyDesk())).append("\n")
                    .append("Quais programas necessitam ser instalados? ").append(s(e.programas())).append("\n")
                    .append("Quais impressoras serão utilizadas? ").append(s(e.impressoras())).append("\n")
                    .append("Login de referência: ").append(s(e.loginReferencia())).append("\n")
                    .append(transferenciaMaquina(item.transferenciaDados()));
            if (i < maquinas.size() - 1) {
                sb.append("----------\n");
            }
        }
        return sb.toString();
    }

    /** Formato antigo: um so bloco tecnico e uma so transferencia para todas as maquinas. */
    private static String inclusaoAgregada(SolicitacaoRequest r) {
        List<MaquinaItem> m = safe(r.maquinas());
        EspecificacoesTecnicas e = espec(r);
        return "Eu, " + s(r.solicitante()) + ", solicito a inclusão de " + m.size()
                + " máquina(s) ao contrato de gerenciamento de rede da empresa " + s(r.empresa()) + ".\n\n"
                + "Seguem dados:\n"
                + "Nome completo do(s) usuário(s): " + coalesce(r.usuarios(), join(m, MaquinaItem::nomeUsuario)) + "\n"
                + "E-mail(s): " + coalesce(r.emails(), join(m, MaquinaItem::email)) + "\n"
                + "Departamento(s): " + coalesce(r.departamentos(), join(m, MaquinaItem::departamento)) + "\n"
                + "Pastas as quais serão acessadas: " + s(e.pastas()) + "\n"
                + "ID Team Viewer: " + s(e.teamViewer()) + "\n"
                + "ID AnyDesk: " + s(e.anyDesk()) + "\n"
                + "Quais programas necessitam ser instalados? " + s(e.programas()) + "\n"
                + "Quais impressoras serão utilizadas? " + s(e.impressoras()) + "\n"
                + "Login de referência: " + s(e.loginReferencia())
                + transferencia(r);
    }

    private static String exclusao(SolicitacaoRequest r) {
        List<MaquinaItem> maquinas = safe(r.maquinas());
        String tags = maquinas.stream()
                .map(MaquinaItem::tag)
                .filter(t -> t != null && !t.isBlank())
                .collect(Collectors.joining(", "));

        StringBuilder sb = new StringBuilder("Eu, ").append(s(r.solicitante()))
                .append(", solicito a exclusão da(s) seguinte(s) máquina(s) do contrato ")
                .append("de gerenciamento da empresa ").append(s(r.empresa())).append(".\n\n")
                .append("Indique quais TAGS deverão ser excluídas: ").append(tags);

        // Hostname/equCodigo so vem quando a maquina foi selecionada na tabela do PAG;
        // observacoes so quando o usuario digitou. Sem nada disso, mantem o texto curto.
        boolean temDetalhe = maquinas.stream().anyMatch(m ->
                preenchido(m.observacoes()) || preenchido(m.hostname()) || preenchido(m.equCodigo()));
        if (!temDetalhe) {
            return sb.toString();
        }

        sb.append("\n\nDetalhes:\n\n");
        for (int i = 0; i < maquinas.size(); i++) {
            MaquinaItem m = maquinas.get(i);
            sb.append("MÁQUINA ").append(i + 1).append("\n")
                    .append("TAG: ").append(s(m.tag())).append("\n");
            if (preenchido(m.hostname())) {
                sb.append("Hostname: ").append(s(m.hostname())).append("\n");
            }
            if (preenchido(m.equCodigo())) {
                sb.append("Código do equipamento: ").append(s(m.equCodigo())).append("\n");
            }
            if (preenchido(m.observacoes())) {
                sb.append("Observações: ").append(s(m.observacoes())).append("\n");
            }
            if (i < maquinas.size() - 1) {
                sb.append("----------\n");
            }
        }
        return sb.toString();
    }

    private static String substituicao(SolicitacaoRequest r) {
        List<Substituicao> subs = safe(r.substituicoes());
        StringBuilder sb = new StringBuilder("Eu, ").append(s(r.solicitante()))
                .append(", solicito a substituição de ").append(subs.size())
                .append(" máquina(s) dentro do contrato de gerenciamento da empresa ")
                .append(s(r.empresa())).append(".\n\n");

        for (Substituicao sub : subs) {
            var a = sub.maquinaAntiga();
            var n = sub.maquinaNova();
            var nu = n == null ? null : n.novoUsuario();
            sb.append("TAG: ").append(a == null ? "" : s(a.tag())).append("\n");
            // Hostname/equCodigo so existem quando a maquina veio da tabela do PAG.
            if (a != null && preenchido(a.hostname())) {
                sb.append("Hostname: ").append(s(a.hostname())).append("\n");
            }
            if (a != null && preenchido(a.equCodigo())) {
                sb.append("Código do equipamento: ").append(s(a.equCodigo())).append("\n");
            }
            sb.append("E-mail: ").append(a == null ? "" : s(a.emailUsuario())).append("\n")
                    .append("Departamento: ").append(a == null ? "" : s(a.departamento())).append("\n")
                    .append("AnyDesk nova: ").append(n == null ? "" : s(n.anyDesk())).append("\n")
                    .append("Mesmo colaborador? ")
                    .append(n == null ? "" : (Boolean.TRUE.equals(n.mesmoUsuario()) ? "Sim" : "Não")).append("\n")
                    .append("Novo colaborador: ")
                    .append(nu == null ? "" : s(nu.nome()) + " - " + s(nu.email()) + " - " + s(nu.departamento()))
                    .append("\n")
                    .append(transferenciaSubstituicao(sub.transferenciaDados()))
                    .append("----------\n");
        }
        return sb.toString();
    }

    private static String novoUsuario(SolicitacaoRequest r) {
        List<MaquinaItem> maquinas = safe(r.maquinas());
        if (maquinas.isEmpty()) {
            return novoUsuarioAgregado(r);
        }

        StringBuilder sb = new StringBuilder("Eu, ").append(s(r.solicitante()))
                .append(", solicito que seja criado perfil de usuário em ").append(maquinas.size())
                .append(" máquina(s) gerenciada(s) da empresa ").append(s(r.empresa()))
                .append(", conforme dados técnicos relacionados abaixo:\n\n");

        for (int i = 0; i < maquinas.size(); i++) {
            MaquinaItem m = maquinas.get(i);
            EspecificacoesTecnicas e = m.especificacoesTecnicas() != null ? m.especificacoesTecnicas() : espec(r);
            sb.append("MÁQUINA ").append(i + 1).append("\n")
                    .append("Nome do usuário: ").append(s(m.nomeUsuario())).append("\n")
                    .append("E-mail: ").append(s(m.email())).append("\n")
                    .append("Departamento: ").append(s(m.departamento())).append("\n")
                    .append("Pastas as quais serão acessadas: ").append(s(e.pastas())).append("\n")
                    .append("ID Teamviewer: ").append(s(e.teamViewer())).append("\n")
                    .append("AnyDesk: ").append(s(e.anyDesk())).append("\n")
                    .append("Quais programas necessitam ser instalados? ").append(s(e.programas())).append("\n")
                    .append("Quais impressoras serão utilizadas? ").append(s(e.impressoras())).append("\n")
                    .append("Login de referência: ").append(s(e.loginReferencia())).append("\n");
            if (i < maquinas.size() - 1) {
                sb.append("----------\n");
            }
        }
        return sb.toString();
    }

    /** Formato antigo: uma unica lista de nomes/e-mails e um so bloco tecnico para todas as maquinas. */
    private static String novoUsuarioAgregado(SolicitacaoRequest r) {
        EspecificacoesTecnicas e = espec(r);
        return "Eu, " + s(r.solicitante()) + ", solicito que seja criado um perfil de usuário conforme "
                + "dados técnicos relacionados abaixo:\n\n"
                + "Nome do(s) usuário(s): " + s(r.usuarios()) + "\n"
                + "E-mail(s): " + s(r.emails()) + "\n"
                + "Departamentos: " + s(r.departamentos()) + "\n"
                + "Pastas as quais serão acessadas: " + s(e.pastas()) + "\n"
                + "ID Teamviewer: " + s(e.teamViewer()) + "\n"
                + "AnyDesk: " + s(e.anyDesk()) + "\n"
                + "Quais programas necessitam ser instalados? " + s(e.programas()) + "\n"
                + "Quais impressoras serão utilizadas? " + s(e.impressoras()) + "\n"
                + "Login de referência: " + s(e.loginReferencia());
    }

    /**
     * Transferencia de uma substituicao. A maquina de origem e a propria TAG antiga
     * do bloco, entao aqui so entram os arquivos e programas informados.
     */
    private static String transferenciaSubstituicao(SolicitacaoRequest.TransferenciaDados t) {
        if (t == null || !Boolean.TRUE.equals(t.necessaria())) {
            return "Transferência de dados: Não\n";
        }
        return "Transferência de dados: Sim\n"
                + "  Arquivos: " + s(t.arquivos()) + "\n"
                + "  Programas: " + s(t.programas()) + "\n";
    }

    /** Bloco de transferencia de uma unica maquina, ja indentado sob o bloco dela. */
    private static String transferenciaMaquina(SolicitacaoRequest.TransferenciaDados t) {
        if (t == null || !Boolean.TRUE.equals(t.necessaria())) {
            return "Transferência de dados: Não\n";
        }
        return "Transferência de dados: Sim\n"
                + "  Máquina antiga: " + s(t.maquinaAntiga()) + "\n"
                + "  Arquivos: " + s(t.arquivos()) + "\n"
                + "  Programas: " + s(t.programas()) + "\n"
                + "  Favoritos do navegador: " + (Boolean.TRUE.equals(t.favoritosNavegador()) ? "Sim" : "Não") + "\n"
                + "  Assinaturas do Outlook: " + (Boolean.TRUE.equals(t.assinaturasOutlook()) ? "Sim" : "Não") + "\n";
    }

    private static String transferencia(SolicitacaoRequest r) {
        var t = r.transferenciaDados();
        if (t == null || !Boolean.TRUE.equals(t.necessaria())) {
            return "";
        }
        return "\n\nTransferência de dados:\n"
                + "Máquina antiga: " + s(t.maquinaAntiga()) + "\n"
                + "Arquivos: " + s(t.arquivos()) + "\n"
                + "Programas: " + s(t.programas()) + "\n"
                + "Favoritos do navegador: " + Boolean.TRUE.equals(t.favoritosNavegador()) + "\n"
                + "Assinaturas do Outlook: " + Boolean.TRUE.equals(t.assinaturasOutlook());
    }

    // helpers
    private static EspecificacoesTecnicas espec(SolicitacaoRequest r) {
        return r.especificacoesTecnicas() != null
                ? r.especificacoesTecnicas()
                : new EspecificacoesTecnicas(null, null, null, null, null, null);
    }

    private static <T> List<T> safe(List<T> l) {
        return l == null ? List.of() : l;
    }

    private static String s(String v) {
        return v == null ? "" : v;
    }

    private static boolean preenchido(String v) {
        return v != null && !v.isBlank();
    }

    private static String coalesce(String preferido, String fallback) {
        return preferido != null && !preferido.isBlank() ? preferido : fallback;
    }

    private static String join(List<MaquinaItem> m, java.util.function.Function<MaquinaItem, String> f) {
        return m.stream().map(f).map(ComentarioBuilder::s)
                .filter(v -> !v.isBlank())
                .collect(Collectors.joining(", "));
    }

    public static String assunto(String tipoFormulario) {
        return switch (tipoFormulario == null ? "" : tipoFormulario) {
            case "inclusao" -> "SOLICITAÇÃO PARA INCLUSÃO DE MÁQUINA EM GERENCIAMENTO";
            case "exclusao" -> "SOLICITAÇÃO PARA EXCLUSÃO DE MÁQUINA EM GERENCIAMENTO";
            case "substituicao" -> "SOLICITAÇÃO PARA SUBSTITUIÇÃO DE MÁQUINAS EM GERENCIAMENTO";
            case "novoUsuario" -> "SOLICITAÇÃO PARA CONFIGURAÇÃO DE NOVO USUÁRIO EM MÁQUINA GERENCIADA";
            default -> "SOLICITAÇÃO DE GERENCIAMENTO DE MÁQUINAS";
        };
    }

    /** Corpo HTML simples (o flow usava HTML exportado do Word; aqui vai um <pre> legível). */
    public static String corpoHtml(SolicitacaoRequest r) {
        String texto = build(r)
                .replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
        return "<div style=\"font-family:'Segoe UI',system-ui,sans-serif;color:#404040\">"
                + "<p><b>O cliente " + s(r.empresa()) + "</b> enviou uma solicitação ("
                + s(r.tipoFormulario()) + ").</p>"
                + "<p><b>Nº do chamado:</b> " + s(r.numeroChamado())
                + " &nbsp;|&nbsp; <b>Solicitante:</b> " + s(r.solicitante()) + "</p>"
                + "<pre style=\"white-space:pre-wrap;font:inherit;background:#f6f8fa;padding:12px;border-radius:8px\">"
                + texto + "</pre></div>";
    }
}
