import { CSSProperties, ReactNode } from 'react';

/**
 * Visual compartilhado das telas de autenticacao (login, cadastro, recuperacao)
 * e dos avisos de desfecho. Mantido aqui para as tres telas nao divergirem.
 */
export const FUNDO: CSSProperties = {
  minHeight: '100vh',
  background: '#f8fafc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: "'Segoe UI', system-ui, sans-serif",
};

export const CARD: CSSProperties = {
  background: '#fff',
  borderRadius: 16,
  padding: '2.5rem',
  boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
  maxWidth: 400,
  width: '100%',
};

/** Cores dos desfechos: verde resolveu, ambar precisa de acao, azul informativo. */
export const SUCESSO = '#16a34a';
export const ATENCAO = '#f59e0b';
export const INFO = '#2563eb';

/**
 * Tela de desfecho: circulo com icone, titulo, explicacao e as acoes.
 * Substitui o card inteiro — quem chegou aqui terminou (ou travou), e nao
 * adianta continuar mostrando o formulario atras.
 */
export default function Splash({
  cor,
  simbolo,
  titulo,
  texto,
  children,
}: {
  cor: string;
  simbolo: string;
  titulo: string;
  texto: ReactNode;
  children?: ReactNode;
}): JSX.Element {
  return (
    <div style={FUNDO}>
      <div style={{ ...CARD, textAlign: 'center' }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: cor,
            color: '#fff',
            fontSize: 32,
            lineHeight: '64px',
            textAlign: 'center',
            margin: '0 auto 20px',
          }}
          aria-hidden="true"
        >
          {simbolo}
        </div>
        <p style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>{titulo}</p>
        <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 24px', lineHeight: 1.6 }}>{texto}</p>
        {children}
      </div>
    </div>
  );
}
