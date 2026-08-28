package com.phsbrasil.formulariomaquinas.Auth;

import java.time.Instant;

/**
 * Linha da tabela de login (PHSDevs.dbo.tblLogin).
 * Equivalente ao item da lista SharePoint usada no projeto Pagina-PHS-Clube.
 */
public record Login(
        Long id,
        String email,
        String senhaHash,
        String nome,
        String roles,        // CSV, ex.: "admin,user"
        boolean ativo,
        Instant criadoEm,
        Instant atualizadoEm,
        Instant ultimoLoginEm
) {
}
