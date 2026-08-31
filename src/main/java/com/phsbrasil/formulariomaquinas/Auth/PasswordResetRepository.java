package com.phsbrasil.formulariomaquinas.Auth;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Acesso a tblLoginResetToken (mesmo datasource primario do tblLogin).
 *
 * A tabela guarda o SHA-256 do token, nunca o token. O prazo de validade e
 * calculado pelo proprio SQL Server (SYSUTCDATETIME), para nao depender do
 * relogio da maquina que roda a aplicacao.
 */
@Repository
public class PasswordResetRepository {

    private final JdbcClient jdbcClient;

    public PasswordResetRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    /** Marca como usados todos os tokens ainda validos do e-mail (so um vale por vez). */
    public void invalidarAnteriores(String email) {
        jdbcClient.sql("""
                        UPDATE tblLoginResetToken
                        SET UsadoEm = SYSUTCDATETIME()
                        WHERE Email = :email AND UsadoEm IS NULL
                        """)
                .param("email", email)
                .update();
    }

    public void inserir(String email, String tokenHash, int validadeMinutos) {
        jdbcClient.sql("""
                        INSERT INTO tblLoginResetToken (Email, TokenHash, CriadoEm, ExpiraEm)
                        VALUES (:email, :hash, SYSUTCDATETIME(),
                                DATEADD(MINUTE, :minutos, SYSUTCDATETIME()))
                        """)
                .param("email", email)
                .param("hash", tokenHash)
                .param("minutos", validadeMinutos)
                .update();
    }

    /** E-mail do dono do token, se ele existir, nao tiver sido usado e nao tiver vencido. */
    public Optional<String> emailDeTokenValido(String tokenHash) {
        return jdbcClient.sql("""
                        SELECT Email FROM tblLoginResetToken
                        WHERE TokenHash = :hash
                          AND UsadoEm IS NULL
                          AND ExpiraEm > SYSUTCDATETIME()
                        """)
                .param("hash", tokenHash)
                .query(String.class)
                .optional();
    }

    /**
     * Consome o token. Retorna false se outra requisicao ja o tiver consumido
     * entre a leitura e esta chamada (o UsadoEm IS NULL no WHERE garante que so
     * uma das duas ganha).
     */
    public boolean marcarComoUsado(String tokenHash) {
        int linhas = jdbcClient.sql("""
                        UPDATE tblLoginResetToken
                        SET UsadoEm = SYSUTCDATETIME()
                        WHERE TokenHash = :hash AND UsadoEm IS NULL
                        """)
                .param("hash", tokenHash)
                .update();
        return linhas == 1;
    }
}
