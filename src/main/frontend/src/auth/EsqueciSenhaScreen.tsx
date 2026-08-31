import { FormEvent, useState } from 'react';
import { Link, MessageBar, MessageBarType, PrimaryButton, TextField } from '@fluentui/react';

import { solicitarRecuperacao } from './authClient';
import Splash, { CARD, FUNDO, INFO } from './splash';

export default function EsqueciSenhaScreen({
  onIrParaLogin,
}: {
  onIrParaLogin: () => void;
}): JSX.Element {
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function submit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      await solicitarRecuperacao(email.trim());
      setEnviado(true);
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Falha ao enviar o e-mail.');
    } finally {
      setCarregando(false);
    }
  }

  if (enviado) {
    // Nao confirma se a conta existe: a mesma mensagem vale para os dois casos.
    return (
      <Splash
        cor={INFO}
        simbolo="✉"
        titulo="Verifique o seu e-mail"
        texto={
          <>
            Se existir uma conta com <strong>{email.trim()}</strong>, o link de redefinicao
            ja esta a caminho. Ele vale por 30 minutos e so pode ser usado uma vez.
          </>
        }
      >
        <PrimaryButton text="Voltar ao login" onClick={onIrParaLogin} styles={{ root: { width: '100%' } }} />
        <p style={{ fontSize: 12, color: '#94a3b8', margin: '16px 0 0', lineHeight: 1.5 }}>
          Nao chegou? Confira a caixa de spam antes de pedir outro link.
        </p>
      </Splash>
    );
  }

  return (
    <div style={FUNDO}>
      <form onSubmit={submit} style={CARD}>
        <p style={{ fontSize: 22, fontWeight: 800, color: '#2563eb', margin: '0 0 4px' }}>PHS Brasil</p>
        <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 20px' }}>Recuperar senha</p>

        {erro && (
          <MessageBar messageBarType={MessageBarType.error} styles={{ root: { marginBottom: 12 } }}>
            {erro}
          </MessageBar>
        )}

        <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 16px' }}>
          Informe o e-mail da sua conta. Enviaremos um link para voce cadastrar uma senha nova.
        </p>

        <TextField
          label="E-mail"
          type="email"
          required
          value={email}
          onChange={(_, v) => setEmail(v ?? '')}
          autoComplete="username"
        />
        <PrimaryButton
          type="submit"
          text={carregando ? 'Enviando...' : 'Enviar link'}
          disabled={carregando}
          styles={{ root: { width: '100%', marginTop: 20 } }}
        />

        <div style={{ marginTop: 16, textAlign: 'center', fontSize: 13, color: '#64748b' }}>
          Lembrou a senha? <Link onClick={onIrParaLogin} styles={{ root: { fontWeight: 600 } }}>Voltar ao login</Link>
        </div>
      </form>
    </div>
  );
}
