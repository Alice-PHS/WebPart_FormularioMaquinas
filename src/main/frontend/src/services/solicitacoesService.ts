import { apiUrl, authHeaders } from '../auth/authClient';

/**
 * Envia a solicitacao dos formularios (inclusao/exclusao/substituicao/novoUsuario)
 * para o backend. Substitui o POST direto no Power Automate.
 * Retorna true se o backend respondeu OK.
 */
export async function enviarSolicitacao(payload: unknown): Promise<boolean> {
  try {
    const res = await fetch(apiUrl('/api/solicitacoes'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
