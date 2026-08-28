package com.phsbrasil.formulariomaquinas.db;

import com.phsbrasil.formulariomaquinas.Models.PrecoAcronis;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PrecoRepository {

    // O JdbcClient é a ferramenta do Spring para executar SQL de forma fluente
    private final JdbcClient jdbcClient;

    public PrecoRepository(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public Optional<PrecoAcronis> buscarPorId(Long id) {
        String sql = "SELECT CNPJ As cnpj, " +
                "NomeFantasia As nomeFantasia," +
                "servidor As servidor, " +
                "Moeda As moeda, " +
                "TipoCobranca As tipoCobranca, " +
                "PeriodoApuracao As periodoApuracao, " +
                "ValorUnitarioSeatMicrosoft As valorUnitarioSeatMicrosoft, " +
                "ValorUnitarioGB As valorUnitarioGB, " +
                "ValorUnitarioPhysicalServer As valorUnitarioPhysicalServer, " +
                "ValorUnitarioWorkstation As valorUnitarioWorkstation, " +
                "ValorUnitarioVirtualMachine As valorUnitarioVirtualMachine, " +
                "ValorUnitarioSeatGoogle As valorUnitarioSeatGoogle, " +
                "Status As status, " +
                "IDProdutos As idProdutos FROM tblPrecosAcronis WHERE id = :id";

        return jdbcClient.sql(sql)
                .param("id", id)
                .query(PrecoAcronis.class)
                .optional();
    }

    public List<PrecoAcronis> obterTodos(int limit, int offset) {
        String sql = "SELECT CNPJ As cnpj, " +
                "NomeFantasia As nomeFantasia," +
                "servidor As servidor, " +
                "Moeda As moeda, " +
                "TipoCobranca As tipoCobranca, " +
                "PeriodoApuracao As periodoApuracao, " +
                "ValorUnitarioSeatMicrosoft As valorUnitarioSeatMicrosoft, " +
                "ValorUnitarioGB As valorUnitarioGB, " +
                "ValorUnitarioPhysicalServer As valorUnitarioPhysicalServer, " +
                "ValorUnitarioWorkstation As valorUnitarioWorkstation, " +
                "ValorUnitarioVirtualMachine As valorUnitarioVirtualMachine, " +
                "ValorUnitarioSeatGoogle As valorUnitarioSeatGoogle, " +
                "Status As status, " +
                "IDProdutos As idProdutos " +
                "FROM tblPrecosAcronis " +
                "ORDER BY CNPJ " +
                "OFFSET :offset ROWS " +
                "FETCH NEXT :limitvar ROWS ONLY";

        return jdbcClient.sql(sql)
                .param("limitvar", limit)
                .param("offset", offset) // O offset geralmente começa em 0 para a primeira página
                .query(PrecoAcronis.class)
                .list();
    }

    public void salvar(PrecoAcronis preco) {
        String sql = "INSERT INTO tblPrecosAcronis (CNPJ) VALUES (:cnpj)";

        jdbcClient.sql(sql)
                .param("cnpj", preco.cnpj())
                .update();
    }
}