package com.phsbrasil.formulariomaquinas.Auth;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Geracao e validacao manual de JWT (HS256 assinado).
 * Porta do JWT/JwtAuth.cs do projeto Pagina-PHS-Clube.
 *
 * Obs.: o codigo C# tambem CRIPTOGRAFAVA o token (JWE, AES-128). Aqui ficou so
 * assinado (JWS), que e o padrao para API. Se quiser JWE, da pra trocar por
 * EncryptedJWT do Nimbus sem mexer no resto.
 */
@Service
public class JwtService {

    private static final Logger log = LoggerFactory.getLogger(JwtService.class);

    @Value("${phs.jwt.secret:}")
    private String secret;

    @Value("${phs.jwt.issuer:https://phsbrasil.com.br/}")
    private String issuer;

    @Value("${phs.jwt.audience:formulario-maquinas}")
    private String audience;

    @Value("${phs.jwt.expiration-minutes:180}")
    private long expirationMinutes;

    private byte[] secretBytes;

    @PostConstruct
    void init() {
        if (secret == null || secret.isBlank()) {
            byte[] aleatoria = new byte[48];
            new SecureRandom().nextBytes(aleatoria);
            secretBytes = aleatoria;
            log.warn("phs.jwt.secret NAO configurado - usando chave aleatoria efemera. "
                    + "Os tokens deixam de valer a cada restart. Defina phs.jwt.secret (>=32 bytes) em producao.");
            return;
        }
        secretBytes = secret.getBytes(StandardCharsets.UTF_8);
        if (secretBytes.length < 32) {
            throw new IllegalStateException("phs.jwt.secret precisa de pelo menos 32 bytes para HS256.");
        }
    }

    public long getExpiresInSeconds() {
        return expirationMinutes * 60;
    }

    /** Equivalente ao JwtAuth.CreateToken(). */
    public String gerarToken(Login usuario) {
        try {
            Instant agora = Instant.now();
            Instant exp = agora.plus(expirationMinutes, ChronoUnit.MINUTES);

            JWTClaimsSet claims = new JWTClaimsSet.Builder()
                    .issuer(issuer)
                    .audience(audience)
                    .subject(usuario.email())
                    .claim("nome", usuario.nome())
                    .claim("roles", parseRoles(usuario.roles()))
                    .issueTime(Date.from(agora))
                    .expirationTime(Date.from(exp))
                    .jwtID(UUID.randomUUID().toString())
                    .build();

            SignedJWT jwt = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claims);
            jwt.sign(new MACSigner(secretBytes));
            return jwt.serialize();
        } catch (JOSEException e) {
            throw new IllegalStateException("Falha ao gerar o token JWT", e);
        }
    }

    /** Equivalente ao JwtAuth.ValidateToken(). Lanca JwtInvalidoException se algo nao bater. */
    public JWTClaimsSet validar(String token) {
        try {
            SignedJWT jwt = SignedJWT.parse(token);

            if (!jwt.verify(new MACVerifier(secretBytes))) {
                throw new JwtInvalidoException("Assinatura invalida");
            }

            JWTClaimsSet claims = jwt.getJWTClaimsSet();

            Date exp = claims.getExpirationTime();
            if (exp == null || exp.toInstant().isBefore(Instant.now())) {
                throw new JwtInvalidoException("Token expirado");
            }
            if (!issuer.equals(claims.getIssuer())) {
                throw new JwtInvalidoException("Issuer invalido");
            }
            if (claims.getAudience() == null || !claims.getAudience().contains(audience)) {
                throw new JwtInvalidoException("Audience invalido");
            }
            return claims;
        } catch (ParseException | JOSEException e) {
            throw new JwtInvalidoException("Token malformado");
        }
    }

    private static List<String> parseRoles(String csv) {
        if (csv == null || csv.isBlank()) {
            return List.of("user");
        }
        return Arrays.stream(csv.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }

    public static class JwtInvalidoException extends RuntimeException {
        public JwtInvalidoException(String msg) {
            super(msg);
        }
    }
}
