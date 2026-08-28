package com.phsbrasil.formulariomaquinas.Auth.dto;

import java.util.List;

public record UsuarioResponse(Long id, String email, String nome, List<String> roles) {
}
