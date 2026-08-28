import { apiUrl, authHeaders } from '../auth/authClient';

/**
 * Resolve o nome fantasia da empresa pelo dominio do e-mail.
 *
 * SPFx: consultava a lista "Clientes" do SharePoint via context.spHttpClient.
 * Agora: GET {API_BASE}/api/empresas?dominio=... (autenticado com o Bearer do login),
 * e o backend consulta a lista "Clientes" via Microsoft Graph.
 *
 * Retorna null em silencio se nao achar / backend nao configurado — mesmo
 * comportamento tolerante a falha do codigo original.
 */
export async function buscarEmpresaPorDominio(dominio: string): Promise<string | null> {
  if (!dominio) return null;

  try {
    const res = await fetch(apiUrl(`/api/empresas?dominio=${encodeURIComponent(dominio)}`), {
      headers: { ...authHeaders(), Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const data = await res.json();
    return data?.nomeFantasia ?? null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao buscar dados do cliente:', error);
    return null;
  }
}
