const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');
const TOKEN_KEY = 'phs.auth.token';

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}

export function getToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function setToken(token: string): void {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* sessionStorage indisponivel — segue sem persistir */
  }
}

export function clearToken(): void {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

export function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface Usuario {
  id: number;
  email: string;
  nome: string | null;
  roles: string[];
}

/** POST /api/auth/login -> guarda o access_token na sessao. */
export async function login(email: string, senha: string): Promise<void> {
  const res = await fetch(apiUrl('/api/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  if (res.status === 401) throw new Error('E-mail ou senha invalidos.');
  if (!res.ok) throw new Error('Nao foi possivel entrar. Tente novamente.');

  const data = await res.json();
  const token: string | undefined = data.access_token ?? data.accessToken;
  if (!token) throw new Error('Resposta de login invalida.');
  setToken(token);
}

/** POST /api/auth/register -> cria a conta (nao loga). 201 = ok, 409 = e-mail ja existe. */
export async function register(nome: string, email: string, senha: string): Promise<void> {
  const res = await fetch(apiUrl('/api/auth/register'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha }),
  });

  if (res.status === 409) throw new Error('Ja existe uma conta com esse e-mail.');
  if (!res.ok) throw new Error('Nao foi possivel criar a conta. Tente novamente.');
}

/** GET /api/auth/me -> usuario logado, ou null se o token nao vale mais. */
export async function me(): Promise<Usuario | null> {
  if (!getToken()) return null;

  const res = await fetch(apiUrl('/api/auth/me'), {
    headers: { ...authHeaders(), Accept: 'application/json' },
  });

  if (res.status === 401) {
    clearToken();
    return null;
  }
  if (!res.ok) return null;
  return res.json();
}
