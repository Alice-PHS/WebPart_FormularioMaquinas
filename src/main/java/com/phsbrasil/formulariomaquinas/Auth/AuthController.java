package com.phsbrasil.formulariomaquinas.Auth;

import com.phsbrasil.formulariomaquinas.Auth.dto.AlterarSenhaRequest;
import com.phsbrasil.formulariomaquinas.Auth.dto.LoginRequest;
import com.phsbrasil.formulariomaquinas.Auth.dto.RegisterRequest;
import com.phsbrasil.formulariomaquinas.Auth.dto.TokenResponse;
import com.phsbrasil.formulariomaquinas.Auth.dto.UsuarioResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * Porta do Controllers/AuthController.cs do Pagina-PHS-Clube.
 *
 *  POST /api/auth/login          -> { access_token, token_type, expires_in }   (publico)
 *  POST /api/auth/register       -> 201                                        (publico)
 *  POST /api/auth/alterar-senha  -> 200                                        (exige Bearer)
 *  GET  /api/auth/me             -> { id, email, nome, roles }                 (exige Bearer)
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public TokenResponse login(@RequestBody LoginRequest req) {
        try {
            return authService.login(req);
        } catch (AuthService.CredenciaisInvalidasException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Senha invalida, tente novamente.");
        }
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegisterRequest req) {
        try {
            authService.registrar(req);
        } catch (AuthService.EmailJaCadastradoException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Um usuario com esse e-mail ja existe.");
        }
    }

    @PostMapping("/alterar-senha")
    public void alterarSenha(@RequestBody AlterarSenhaRequest req, HttpServletRequest http) {
        String email = (String) http.getAttribute(JwtAuthFilter.ATTR_EMAIL);
        try {
            authService.alterarSenha(email, req.novaSenha());
        } catch (AuthService.UsuarioNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario nao encontrado.");
        }
    }

    @GetMapping("/me")
    public UsuarioResponse me(HttpServletRequest http) {
        String email = (String) http.getAttribute(JwtAuthFilter.ATTR_EMAIL);
        try {
            return authService.buscarUsuario(email);
        } catch (AuthService.UsuarioNaoEncontradoException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario nao encontrado.");
        }
    }
}
