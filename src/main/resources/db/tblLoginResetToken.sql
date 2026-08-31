/*
 * Tabela de tokens de recuperacao de senha (banco PHSDevs, mesmo do tblLogin).
 * Rodar uma vez, na mao, antes de subir a versao com /api/auth/recuperar-senha.
 *
 * Guarda o SHA-256 do token, nunca o token em si: um vazamento desta tabela
 * nao permite redefinir a senha de ninguem (mesma logica do SenhaHash).
 */
IF OBJECT_ID('dbo.tblLoginResetToken', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.tblLoginResetToken (
        Id        INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_tblLoginResetToken PRIMARY KEY,
        Email     VARCHAR(255)      NOT NULL,
        TokenHash CHAR(64)          NOT NULL,   -- SHA-256 em hex minusculo
        CriadoEm  DATETIME2(3)      NOT NULL,
        ExpiraEm  DATETIME2(3)      NOT NULL,
        UsadoEm   DATETIME2(3)      NULL        -- preenchido no uso; token vale 1 vez
    );

    -- Busca do fluxo de redefinicao (por hash).
    CREATE UNIQUE INDEX UX_tblLoginResetToken_TokenHash
        ON dbo.tblLoginResetToken (TokenHash);

    -- Invalidacao dos tokens anteriores do mesmo e-mail.
    CREATE INDEX IX_tblLoginResetToken_Email
        ON dbo.tblLoginResetToken (Email) INCLUDE (UsadoEm, ExpiraEm);
END
GO

/*
 * Limpeza opcional: tokens vencidos ou usados nao servem mais para nada.
 * Pode virar um job semanal.
 *
 * DELETE FROM dbo.tblLoginResetToken
 * WHERE UsadoEm IS NOT NULL OR ExpiraEm < DATEADD(DAY, -7, SYSUTCDATETIME());
 */
