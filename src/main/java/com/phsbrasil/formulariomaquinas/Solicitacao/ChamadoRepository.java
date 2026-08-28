package com.phsbrasil.formulariomaquinas.Solicitacao;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

/**
 * tblChamado / tblChamado_Interacao — banco "chamados" (NetworkSolution).
 * Porta das acoes SQL do flow (SELECT tblChamado, SELECT TOP 1 interacao,
 * INSERT interacao, UPDATE Cha_Status).
 */
@Repository
public class ChamadoRepository {

    private static final ZoneId BRT = ZoneId.of("America/Sao_Paulo");

    private final JdbcClient jdbc;

    public ChamadoRepository(@Qualifier("chamadosJdbcClient") JdbcClient chamadosJdbcClient) {
        this.jdbc = chamadosJdbcClient;
    }

    /** true se existe um chamado com esse Cha_Codigo. */
    public boolean existeChamado(int chaCodigo) {
        Integer achou = jdbc.sql("SELECT TOP 1 1 FROM tblChamado WHERE Cha_Codigo = :cod")
                .param("cod", chaCodigo)
                .query(Integer.class)
                .optional()
                .orElse(null);
        return achou != null;
    }

    /**
     * Proximo ChI_Codigo. Replica o flow: SELECT TOP 1 ChI_Codigo ... ORDER BY Cha_Codigo DESC, +1.
     * (Sim, ordena por Cha_Codigo, nao por ChI_Codigo — comportamento identico ao Power Automate.)
     */
    public int proximoCodigoInteracao() {
        Integer ultimo = jdbc.sql("SELECT TOP 1 ChI_Codigo FROM tblChamado_Interacao ORDER BY Cha_Codigo DESC")
                .query(Integer.class)
                .optional()
                .orElse(0);
        return ultimo + 1;
    }

    public void inserirInteracao(int chaCodigo, int chiCodigo, String comentario, String autor) {
        jdbc.sql("""
                        INSERT INTO tblChamado_Interacao
                            (Cha_Codigo, ChI_Codigo, ChI_Comentario, ChI_Autor, ChI_Tipo, ChI_Data)
                        VALUES
                            (:cha, :chi, :comentario, :autor, 1, :data)
                        """)
                .param("cha", chaCodigo)
                .param("chi", chiCodigo)
                .param("comentario", comentario)
                .param("autor", autor)
                .param("data", LocalDateTime.now(BRT))
                .update();
    }

    public void atualizarStatus(int chaCodigo, int status) {
        jdbc.sql("UPDATE tblChamado SET Cha_Status = :status WHERE Cha_Codigo = :cha")
                .param("status", status)
                .param("cha", chaCodigo)
                .update();
    }

    /** Registra a interacao e marca o chamado como Cha_Status = 1 (mesma sequencia do flow aprovado). */
    public void registrarInteracaoEConcluir(int chaCodigo, String comentario, String autor) {
        inserirInteracao(chaCodigo, proximoCodigoInteracao(), comentario, autor);
        atualizarStatus(chaCodigo, 1);
    }

    public Optional<Integer> parseCodigo(String numeroChamado) {
        try {
            return Optional.of(Integer.parseInt(numeroChamado.trim()));
        } catch (RuntimeException e) {
            return Optional.empty();
        }
    }
}
