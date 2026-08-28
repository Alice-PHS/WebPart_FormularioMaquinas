package com.phsbrasil.formulariomaquinas.Auth;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Acesso a tabela de login. Usa o JdbcClient do datasource primario
 * (assume que ele aponta para o banco PHSDevs; se PHSDevs for um segundo
 * banco, criar um segundo DataSource/JdbcClient e injetar aqui via @Qualifier).
 */
@Repository
public class LoginRepository {

    private final JdbcClient jdbcClient;

    public LoginRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public Optional<Login> buscarPorEmail(String email) {
        String sql = """
                SELECT Id            AS id,
                       Email         AS email,
                       SenhaHash     AS senhaHash,
                       Nome          AS nome,
                       Roles         AS roles,
                       Ativo         AS ativo,
                       CriadoEm      AS criadoEm,
                       AtualizadoEm  AS atualizadoEm,
                       UltimoLoginEm AS ultimoLoginEm
                FROM tblLogin
                WHERE Email = :email
                """;

        return jdbcClient.sql(sql)
                .param("email", email)
                .query(Login.class)
                .optional();
    }

    public boolean existeEmail(String email) {
        Integer qtd = jdbcClient.sql("SELECT COUNT(1) FROM tblLogin WHERE Email = :email")
                .param("email", email)
                .query(Integer.class)
                .single();
        return qtd != null && qtd > 0;
    }

    public void inserir(String email, String senhaHash, String nome, String roles) {
        String sql = """
                INSERT INTO tblLogin (Email, SenhaHash, Nome, Roles, Ativo, CriadoEm)
                VALUES (:email, :senhaHash, :nome, :roles, 1, SYSUTCDATETIME())
                """;

        jdbcClient.sql(sql)
                .param("email", email)
                .param("senhaHash", senhaHash)
                .param("nome", nome)
                .param("roles", roles)
                .update();
    }

    public void atualizarSenha(String email, String novoHash) {
        jdbcClient.sql("""
                        UPDATE tblLogin
                        SET SenhaHash = :hash, AtualizadoEm = SYSUTCDATETIME()
                        WHERE Email = :email
                        """)
                .param("hash", novoHash)
                .param("email", email)
                .update();
    }

    public void registrarLoginBemSucedido(String email) {
        jdbcClient.sql("UPDATE tblLogin SET UltimoLoginEm = SYSUTCDATETIME() WHERE Email = :email")
                .param("email", email)
                .update();
    }
}
