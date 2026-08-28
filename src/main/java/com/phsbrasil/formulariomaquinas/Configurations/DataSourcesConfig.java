package com.phsbrasil.formulariomaquinas.Configurations;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.autoconfigure.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.simple.JdbcClient;

import javax.sql.DataSource;

/**
 * Dois bancos no mesmo servidor:
 *  - primario   (spring.datasource.*)        -> PHSDevs: tblLogin, tblGestaoEquipamentos_Log, tbl*Acronis
 *  - "chamados" (phs.chamados.datasource.*)  -> NetworkSolution: tblChamado, tblChamado_Interacao
 *
 * Usa DataSourceProperties + initializeDataSourceBuilder() (padrao do Spring Boot
 * para multiplos datasources) para o mapeamento url/username/password/driver
 * funcionar com o pool (Hikari) sem gambiarra.
 */
@Configuration
public class DataSourcesConfig {

    // ---- primario (PHSDevs) ----

    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource")
    public DataSourceProperties dataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    @Primary
    public DataSource dataSource(DataSourceProperties dataSourceProperties) {
        return dataSourceProperties.initializeDataSourceBuilder().build();
    }

    @Bean
    @Primary
    public JdbcClient jdbcClient(DataSource dataSource) {
        return JdbcClient.create(dataSource);
    }

    // ---- chamados (NetworkSolution) ----

    @Bean
    @ConfigurationProperties("phs.chamados.datasource")
    public DataSourceProperties chamadosDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    public DataSource chamadosDataSource(
            @Qualifier("chamadosDataSourceProperties") DataSourceProperties props) {
        return props.initializeDataSourceBuilder().build();
    }

    @Bean
    public JdbcClient chamadosJdbcClient(@Qualifier("chamadosDataSource") DataSource ds) {
        return JdbcClient.create(ds);
    }
}
