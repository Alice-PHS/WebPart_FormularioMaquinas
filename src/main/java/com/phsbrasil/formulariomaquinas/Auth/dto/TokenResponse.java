package com.phsbrasil.formulariomaquinas.Auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Mesmo formato do AccessToken.cs do Pagina-PHS-Clube:
 * { "access_token": "...", "token_type": "Bearer", "expires_in": 10800 }
 */
public record TokenResponse(
        @JsonProperty("access_token") String accessToken,
        @JsonProperty("token_type") String tokenType,
        @JsonProperty("expires_in") long expiresIn
) {
}
