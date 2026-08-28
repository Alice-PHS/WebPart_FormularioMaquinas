package com.phsbrasil.formulariomaquinas.Auth;

import com.phsbrasil.formulariomaquinas.Auth.dto.LoginRequest;
import com.phsbrasil.formulariomaquinas.Auth.dto.RegisterRequest;
import com.phsbrasil.formulariomaquinas.Auth.dto.TokenResponse;
import com.phsbrasil.formulariomaquinas.Auth.dto.UsuarioResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

/**
 * Orquestra login / registro / troca de senha.
 * Porta do Service/AuthService.cs do Pagina-PHS-Clube, trocando a lista do
 * SharePoint pela tabela tblLogin e o PasswordHasher do ASP.NET Identity pelo
 * BCrypt do spring-security-crypto.
 */
@Service
public class AuthService {

    private final LoginRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(LoginRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    /** Equivalente ao JwtAuth.GeneratePassword(). */
    public String gerarHashSenha(String senhaPura) {
        return passwordEncoder.encode(senhaPura);
    }

    /** Equivalente ao JwtAuth.VerifyPassword(). */
    public boolean senhaConfere(String senhaPura, String hash) {
        return hash != null && !hash.isBlank() && passwordEncoder.matches(senhaPura, hash);
    }

    /** Equivalente ao AuthService.isPasswordValid() + JwtAuth.CreateToken() do controller. */
    public TokenResponse login(LoginRequest req) {
        Login usuario = repository.buscarPorEmail(req.email())
                .filter(Login::ativo)
                .orElse(null);

        if (usuario == null || !senhaConfere(req.senha(), usuario.senhaHash())) {
            throw new CredenciaisInvalidasException();
        }

        String token = jwtService.gerarToken(usuario);
        repository.registrarLoginBemSucedido(usuario.email());
        return new TokenResponse(token, "Bearer", jwtService.getExpiresInSeconds());
    }

    /** Equivalente ao AuthService.createUser() (com isUser check). */
    public void registrar(RegisterRequest req) {
        if (repository.existeEmail(req.email())) {
            throw new EmailJaCadastradoException();
        }
        repository.inserir(req.email(), gerarHashSenha(req.senha()), req.nome(), "user");
    }

    /** Equivalente ao AuthService.updateUser() (parte da senha). */
    public void alterarSenha(String email, String novaSenha) {
        repository.buscarPorEmail(email).orElseThrow(UsuarioNaoEncontradoException::new);
        repository.atualizarSenha(email, gerarHashSenha(novaSenha));
    }

    /** Equivalente ao AuthService.getUser(). */
    public UsuarioResponse buscarUsuario(String email) {
        Login u = repository.buscarPorEmail(email).orElseThrow(UsuarioNaoEncontradoException::new);
        List<String> roles = (u.roles() == null || u.roles().isBlank())
                ? List.of()
                : Arrays.stream(u.roles().split(",")).map(String::trim).filter(s -> !s.isEmpty()).toList();
        return new UsuarioResponse(u.id(), u.email(), u.nome(), roles);
    }

    public static class CredenciaisInvalidasException extends RuntimeException {
    }

    public static class EmailJaCadastradoException extends RuntimeException {
    }

    public static class UsuarioNaoEncontradoException extends RuntimeException {
    }
}
