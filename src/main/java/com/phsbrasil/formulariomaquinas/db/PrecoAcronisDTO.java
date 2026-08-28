package com.phsbrasil.formulariomaquinas.db;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.phsbrasil.formulariomaquinas.Models.ClienteAcronis;
import com.phsbrasil.formulariomaquinas.Models.PrecoAcronis;

import java.math.BigDecimal;

public record PrecoAcronisDTO(String cnpj,
                              String nomeFantasia,
                              String servidor,
                              String tipoCobranca,
                              String status,
                              String periodoApuracao,
                              String moeda,
                              BigDecimal valorUnitarioSeatMicrosoft,
                              BigDecimal valorUnitarioGB,
                              BigDecimal valorUnitarioPhysicalServer,
                              BigDecimal valorUnitarioWorkstation,
                              BigDecimal valorUnitarioVirtualMachine,
                              BigDecimal valorUnitarioSeatGoogle,
                              String idProdutos) {

    public static PrecoAcronisDTO fromModel(PrecoAcronis model) {
        return new PrecoAcronisDTO(model.cnpj().trim(),
                model.nomeFantasia().trim(),
                model.servidor() == null ? "" : model.servidor().trim(),
                model.tipoCobranca() == null ? "" : model.tipoCobranca().trim(),
                model.status().trim(),
                model.periodoApuracao().trim(),
                model.moeda().trim(),
                model.valorUnitarioSeatMicrosoft(),
                model.valorUnitarioGB(),
                model.valorUnitarioPhysicalServer(),
                model.valorUnitarioWorkstation(),
                model.valorUnitarioVirtualMachine(),
                model.valorUnitarioSeatGoogle(),
                model.idProdutos().trim());
    }

    public PrecoAcronis toModel() {
        return new PrecoAcronis(this.cnpj,
                this.nomeFantasia,
                this.status,
                this.periodoApuracao,
                this.tipoCobranca,
                this.moeda,
                this.servidor,
                this.valorUnitarioSeatMicrosoft,
                this.valorUnitarioGB,
                this.valorUnitarioPhysicalServer,
                this.valorUnitarioWorkstation,
                this.valorUnitarioVirtualMachine,
                this.valorUnitarioSeatGoogle,
                this.idProdutos);
    }

}
