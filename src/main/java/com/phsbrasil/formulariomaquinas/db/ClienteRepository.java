package com.phsbrasil.formulariomaquinas.db;

import com.phsbrasil.formulariomaquinas.Models.ClienteAcronis;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ClienteRepository {

    // O JdbcClient é a ferramenta do Spring para executar SQL de forma fluente
    private final JdbcClient jdbcClient;

    public ClienteRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public Optional<ClienteAcronis> buscarPorId(Long id) {
        String sql = "SELECT CNPJ As cnpj, " +
                "NomeFantasia As nomeFantasia, " +
                "Servidor As servidor, " +
                "[UUID(Acronis)] As uuid, " +
                "Status As status, " +
                "IDProdutos As idProdutos FROM tblClientesAcronis WHERE id = :id";

        return jdbcClient.sql(sql)
                .param("id", id)
                .query(ClienteAcronis.class)
                .optional();
    }

    public List<ClienteAcronis> obterTodos(int limit, int offset) {
        String sql = "SELECT CNPJ As cnpj, " +
                "NomeFantasia As nomeFantasia, " +
                "Servidor As servidor, " +
                "[UUID(Acronis)] As uuid, " +
                "Status As status, " +
                "IDProdutos As idProdutos " +
                "FROM tblClientesAcronis " +
                "ORDER BY CNPJ " +
                "OFFSET :offset ROWS " +
                "FETCH NEXT :limitvar ROWS ONLY";

        return jdbcClient.sql(sql)
                .param("limitvar", limit)
                .param("offset", offset) // O offset geralmente começa em 0 para a primeira página
                .query(ClienteAcronis.class)
                .list();
    }

    public void salvar(ClienteAcronis cliente) {
        String sql = "INSERT INTO tblClientesAcronis (CNPJ) VALUES (:cnpj)";

        jdbcClient.sql(sql)
                .param("cnpj", cliente.cnpj())
                .update();
    }
}