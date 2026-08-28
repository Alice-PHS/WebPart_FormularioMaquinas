export interface IFormularioMaquinasProps {
  /** E-mail do usuario logado (vem de GET /api/auth/me). Usado para deduzir o dominio da empresa. */
  userEmail: string;
  /**
   * Resolve o nome fantasia da empresa pelo dominio do e-mail.
   * Retorna null quando nao ha backend configurado ou a empresa nao foi encontrada.
   */
  buscarEmpresaPorDominio: (dominio: string) => Promise<string | null>;
}
