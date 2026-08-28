package com.phsbrasil.formulariomaquinas.Auth;

import com.nimbusds.jwt.JWTClaimsSet;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * Porta do Middleware/JwtMiddleware.cs.old do Pagina-PHS-Clube.
 * Exige "Authorization: Bearer <token>" valido nas rotas listadas em
 * phs.security.protected-patterns (prefixo de path). O resto passa livre,
 * incluindo /api/auth/login e /api/auth/register.
 *
 * Para proteger tambem os endpoints de dados, adicione os prefixos na
 * propriedade, ex.: phs.security.protected-patterns=/api/auth/me,/api/clientes,/api/precos
 */
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    public static final String ATTR_EMAIL = "authEmail";
    public static final String ATTR_CLAIMS = "authClaims";

    private final JwtService jwtService;
    private final List<String> protectedPrefixes;

    public JwtAuthFilter(
            JwtService jwtService,
            @Value("${phs.security.protected-patterns:/api/auth/me,/api/auth/alterar-senha}") String patterns) {
        this.jwtService = jwtService;
        this.protectedPrefixes = Arrays.stream(patterns.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        // Preflight CORS nao carrega Authorization.
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }
        String path = request.getRequestURI().substring(request.getContextPath().length());
        return protectedPrefixes.stream().noneMatch(path::startsWith);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token ausente");
            return;
        }

        try {
            JWTClaimsSet claims = jwtService.validar(header.substring(7).trim());
            request.setAttribute(ATTR_EMAIL, claims.getSubject());
            request.setAttribute(ATTR_CLAIMS, claims);
        } catch (RuntimeException e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token invalido");
            return;
        }

        chain.doFilter(request, response);
    }
}
