/**
 * Parametros de entrada do link (?payload=<base64> ou ?mode=...&chamado=...).
 *
 * Fluxo desejado: LOGIN + BASE64.
 *  - `capturarEntradaFormulario()` roda uma vez no boot (main.tsx), ANTES da tela
 *    de login. Guarda os parametros em memoria e limpa a URL na hora.
 *  - A tela do formulario (passo a passo) so e renderizada pelo App quando o
 *    usuario esta logado; ai ela le esses parametros via `lerEntradaFormulario()`.
 *  - Sem estar logado, o link nao leva a lugar nenhum (cai na tela de login).
 *  - Reload da pagina descarta os parametros (a URL ja foi limpa) — mesmo
 *    comportamento do web part SPFx original.
 */
let entrada = '';

export function capturarEntradaFormulario(): void {
  const search = window.location.search;
  if (search && search.length > 1) {
    entrada = search;
    const urlLimpa =
      window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.hash;
    window.history.replaceState({}, '', urlLimpa);
  }
}

export function lerEntradaFormulario(): string {
  return entrada;
}

/**
 * Token de recuperacao de senha (?token=...), vindo do link do e-mail.
 *
 * Le da mesma copia em memoria que o formulario usa, e nao de
 * window.location: a URL ja foi limpa no boot por capturarEntradaFormulario().
 */
export function lerTokenRecuperacao(): string {
  return new URLSearchParams(entrada).get('token') ?? '';
}

/** Descarta o token apos o uso, para ele nao reaparecer ao voltar para o login. */
export function limparTokenRecuperacao(): void {
  const params = new URLSearchParams(entrada);
  params.delete('token');
  const resto = params.toString();
  entrada = resto ? `?${resto}` : '';
}
