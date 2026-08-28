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
