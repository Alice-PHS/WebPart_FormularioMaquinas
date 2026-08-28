package com.phsbrasil.formulariomaquinas.Models;

import java.math.BigDecimal;

public record PrecoAcronis(String cnpj,
                           String nomeFantasia,
                           String status,
                           String periodoApuracao,
                           String tipoCobranca,
                           String moeda,
                           String servidor,
                           BigDecimal valorUnitarioSeatMicrosoft,
                           BigDecimal valorUnitarioGB,
                           BigDecimal valorUnitarioPhysicalServer,
                           BigDecimal valorUnitarioWorkstation,
                           BigDecimal valorUnitarioVirtualMachine,
                           BigDecimal valorUnitarioSeatGoogle,
                           String idProdutos) {
}
