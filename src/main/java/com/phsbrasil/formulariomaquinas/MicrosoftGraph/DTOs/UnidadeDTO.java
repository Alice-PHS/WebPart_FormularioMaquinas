package com.phsbrasil.formulariomaquinas.MicrosoftGraph.DTOs;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record UnidadeDTO(

        @JsonProperty("Id")
        String id,

        @JsonProperty("Title")
        String titulo

) {}