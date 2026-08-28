package com.phsbrasil.formulariomaquinas.Solicitacao.dto;

import java.util.List;

/**
 * Contrato de POST /api/solicitacoes. E exatamente o que os 4 formularios React
 * ja enviavam para o Power Automate (campos opcionais conforme o tipo).
 */
public record SolicitacaoRequest(
        String tipoFormulario,          // inclusao | exclusao | substituicao | novoUsuario
        String numeroChamado,
        String empresa,
        String solicitante,
        String solicitanteEmail,

        List<MaquinaItem> maquinas,     // inclusao: {nomeUsuario,email,departamento}; exclusao: {tag,observacoes,hostname,equCodigo}
        String usuarios,                // novoUsuario (string)
        String emails,
        String departamentos,
        EspecificacoesTecnicas especificacoesTecnicas,
        TransferenciaDados transferenciaDados,
        List<Substituicao> substituicoes,
        String resumoMaquinas
) {

    public record MaquinaItem(
            String nomeUsuario, String email, String departamento,
            String tag, String observacoes, String hostname, String equCodigo
    ) {}

    public record EspecificacoesTecnicas(
            String pastas, String teamViewer, String anyDesk,
            String programas, String impressoras, String loginReferencia
    ) {}

    public record TransferenciaDados(
            Boolean necessaria, String maquinaAntiga, String arquivos,
            String programas, Boolean favoritosNavegador, Boolean assinaturasOutlook
    ) {}

    public record Substituicao(
            MaquinaAntiga maquinaAntiga,
            MaquinaNova maquinaNova,
            TransferenciaDados transferenciaDados
    ) {
        public record MaquinaAntiga(String tag, String emailUsuario, String departamento,
                                    String hostname, String equCodigo) {}

        public record MaquinaNova(String anyDesk, Boolean mesmoUsuario, NovoUsuario novoUsuario) {
            public record NovoUsuario(String nome, String email, String departamento) {}
        }
    }
}
