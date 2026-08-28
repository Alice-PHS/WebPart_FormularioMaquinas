package com.phsbrasil.formulariomaquinas.db;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.phsbrasil.formulariomaquinas.Models.ClienteAcronis;

public record ClienteAcronisDTO(String cnpj,
                                String nomeFantasia,
                                String servidor,
                                String uuid,
                                String status,
                                String idProdutos) {

    public static ClienteAcronisDTO fromModel(ClienteAcronis model) {
        return new ClienteAcronisDTO(model.cnpj().trim(),
                model.nomeFantasia().trim(),
                model.servidor().trim(),
                model.uuid().trim(),
                model.status().trim(),
                model.idProdutos().trim());
    }

    public ClienteAcronis toModel() {
        return new ClienteAcronis(this.cnpj,
                this.nomeFantasia,
                this.servidor,
                this.uuid,
                this.status,
                this.idProdutos);
    }
}
