package com.phsbrasil.formulariomaquinas.Auth;

import com.phsbrasil.formulariomaquinas.MicrosoftGraph.GraphMailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HexFormat;

/**
 * Recuperacao de senha por token de uso unico enviado por e-mail.
 *
 * BCrypt e via de mao unica: a senha antiga nao pode ser recuperada, so
 * substituida. O fluxo e o padrao: gera um token aleatorio, guarda o SHA-256
 * dele no banco e manda o token por e-mail. Quem tem o e-mail redefine a senha;
 * quem tem o banco, nao.
 *
 * O token NAO e um JWT de proposito: JWT nao da para invalidar depois do uso, e
 * aqui o uso unico e justamente o ponto.
 */
@Service
public class PasswordResetService {

    private static final Logger log = LoggerFactory.getLogger(PasswordResetService.class);

    /** 32 bytes de entropia; em Base64 url-safe viram 43 caracteres. */
    private static final int TOKEN_BYTES = 32;
    private static final int SENHA_MINIMA = 8;

    private final LoginRepository loginRepository;
    private final PasswordResetRepository resetRepository;
    private final AuthService authService;
    private final GraphMailService mailService;
    private final SecureRandom random = new SecureRandom();

    @Value("${phs.auth.reset.expiration-minutes:30}")
    private int validadeMinutos;

    /** Base do link do e-mail, ex.: https://formularios.phsbrasil.com.br */
    @Value("${phs.auth.reset.base-url:}")
    private String baseUrl;

    public PasswordResetService(LoginRepository loginRepository,
                                PasswordResetRepository resetRepository,
                                AuthService authService,
                                GraphMailService mailService) {
        this.loginRepository = loginRepository;
        this.resetRepository = resetRepository;
        this.authService = authService;
        this.mailService = mailService;
    }

    /**
     * Gera e envia o link de recuperacao.
     *
     * Nao lanca excecao quando o e-mail nao existe ou a conta esta inativa: o
     * controller responde 204 em qualquer caso, senao a rota vira um detector
     * de quem tem conta na empresa.
     */
    public void solicitar(String emailBruto) {
        String email = normalizar(emailBruto);
        if (email.isEmpty()) {
            return;
        }

        boolean elegivel = loginRepository.buscarPorEmail(email)
                .filter(Login::ativo)
                .isPresent();

        if (!elegivel) {
            log.info("Recuperacao de senha pedida para e-mail sem conta ativa; nada enviado.");
            return;
        }

        String token = gerarToken();
        resetRepository.invalidarAnteriores(email);
        resetRepository.inserir(email, sha256(token), validadeMinutos);

        mailService.enviarHtml(email, "Redefinicao de senha - Formulario de Maquinas", corpoEmail(token));
        log.info("Link de recuperacao de senha enviado (validade de {} minutos).", validadeMinutos);
    }

    /** Consome o token e troca a senha. */
    public void redefinir(String token, String novaSenha) {
        if (novaSenha == null || novaSenha.length() < SENHA_MINIMA) {
            throw new SenhaFracaException();
        }
        if (token == null || token.isBlank()) {
            throw new TokenInvalidoException();
        }

        String hash = sha256(token.trim());
        String email = resetRepository.emailDeTokenValido(hash)
                .orElseThrow(TokenInvalidoException::new);

        // Consome antes de trocar a senha: se dois pedidos chegarem juntos, so
        // um passa daqui.
        if (!resetRepository.marcarComoUsado(hash)) {
            throw new TokenInvalidoException();
        }

        loginRepository.atualizarSenha(email, authService.gerarHashSenha(novaSenha));
        log.info("Senha redefinida por token de recuperacao.");
    }

    private String gerarToken() {
        byte[] bytes = new byte[TOKEN_BYTES];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private static String sha256(String valor) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-256")
                    .digest(valor.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(digest);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 indisponivel na JVM", e);
        }
    }

    private static String normalizar(String email) {
        return email == null ? "" : email.trim();
    }

    private String corpoEmail(String token) {
        String link = (baseUrl == null ? "" : baseUrl.replaceAll("/+$", "")) + "/?token=" + token;
        return """
                <div style="font-family:'Segoe UI',system-ui,sans-serif;color:#0f172a">
                  <p style="font-size:20px;font-weight:800;color:#2563eb;margin:0 0 4px">PHS Brasil</p>
                  <p style="font-size:14px;color:#64748b;margin:0 0 20px">Formulario de Maquinas</p>
                  <p>Recebemos um pedido para redefinir a sua senha.</p>
                  <p style="margin:24px 0">
                    <a href="%s" style="background:#2563eb;color:#fff;text-decoration:none;
                       padding:12px 20px;border-radius:8px;font-weight:600;display:inline-block">
                      Redefinir minha senha
                    </a>
                  </p>
                  <p style="font-size:13px;color:#64748b">
                    O link vale por %d minutos e so pode ser usado uma vez.
                    Se voce nao pediu isso, ignore este e-mail: a sua senha atual continua valendo.
                  </p>
                  <p style="font-size:12px;color:#94a3b8;margin-top:24px">
                    Se o botao nao funcionar, copie e cole este endereco no navegador:<br>%s
                  </p>
                </div>
                """.formatted(link, validadeMinutos, link);
    }

    public static class TokenInvalidoException extends RuntimeException {
    }

    public static class SenhaFracaException extends RuntimeException {
    }
}
