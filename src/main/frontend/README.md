# Formulário de Máquinas — versão React

Conversão do web part SPFx `WebPart_FormularioMaquinas` para uma SPA React comum
(Vite + React 18 + TypeScript + Fluent UI 8), servida pelo backend Spring Boot
deste projeto.

## O que mudou em relação ao SPFx

| SPFx | Aqui |
| --- | --- |
| `BaseClientSideWebPart` + `ReactDom.render` | `src/main.tsx` com `createRoot` |
| Build Heft / `@microsoft/spfx-*` | Vite (`npm run dev` / `npm run build`) |
| `this.context.pageContext.user` | **sem login** — tela com botão "Acessar" (auth própria virá depois) |
| `context.spHttpClient` → lista `Clientes` | `src/services/clientesService.ts` → `GET {VITE_API_BASE_URL}/clientes?dominio=...` |
| Property pane (`description`) | removido (não era usado) |
| `strings` / `loc/*.js` | removido (só mensagens de ambiente) |
| `<style>` escondendo a chrome do SharePoint | removido |
| `FormularioMaquinas.module.scss`, `assets/*` | removidos (eram código morto) |
| gate "Acesso Negado" (e-mail do link vs. e-mail logado) | removido (não há usuário logado) |

Os 4 formulários (`FormInclusao`, `FormExclusao`, `FormSubstituicao`,
`FormNovoUsuario`), o `formStyles.ts` e o `validation.ts` foram copiados
**sem alteração** — só usam `fetch` para o Power Automate.

## Fluxo de acesso

`src/App.tsx` mostra uma tela com o botão **Acessar**. Clicou → renderiza o
formulário. É um placeholder: a autenticação própria entra aqui no futuro.

## Configuração

`cp .env.example .env` e, quando o endpoint existir, preencha:

- `VITE_API_BASE_URL` — base da API. Espera `GET /clientes?dominio=<dominio>`
  retornando `{ "nomeFantasia": "..." }`.
- Em branco → a busca automática de empresa por domínio é ignorada em silêncio
  (o campo continua vindo pelo parâmetro `cliente` do link).

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera build/  (o build.gradle copia para static/ do .war)
npm run preview  # serve o build
```

## Parâmetros de entrada (iguais ao SPFx)

A tela lê `?mode=`, `?chamado=`, `?cliente=`, `?solicitanteEmail=`, `?tag=`,
`?hostname=`, `?equCodigo=`, `?departamento=`, `?maquinas=` (JSON) ou um
`?payload=` base64 com o mesmo objeto. O `solicitanteEmail` do link é usado
como remetente e para deduzir o domínio da empresa.
