package com.phsbrasil.formulariomaquinas.Solicitacao;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

/**
 * INSERT em tblGestaoEquipamentos_Log (banco primario / PHSDevs).
 * Porta da acao "Inserir_linha_(LOG)" do flow.
 */
@Repository
public class LogRepository {

    private final JdbcClient jdbcClient;

    public LogRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public void inserir(String nomeEmpresa, String modo, String emailSolicitante, Integer numChamado) {
        jdbcClient.sql("""
                        INSERT INTO tblGestaoEquipamentos_Log (nome_empresa, modo, email_solicitante, Num_Chamado)
                        VALUES (:nomeEmpresa, :modo, :emailSolicitante, :numChamado)
                        """)
                .param("nomeEmpresa", nomeEmpresa)
                .param("modo", modo)
                .param("emailSolicitante", emailSolicitante)
                .param("numChamado", numChamado)
                .update();
    }
}
