package com.phsbrasil.formulariomaquinas.Configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityBeansConfig {

    /**
     * Hash de senha usado pelo AuthService. Substitui o
     * PasswordHasher&lt;object&gt; do ASP.NET Identity usado no Pagina-PHS-Clube.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
