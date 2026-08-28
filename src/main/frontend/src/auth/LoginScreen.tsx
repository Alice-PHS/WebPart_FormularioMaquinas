import { FormEvent, useState } from 'react';
import { Link, MessageBar, MessageBarType, PrimaryButton, TextField } from '@fluentui/react';

import { login } from './authClient';

export default function LoginScreen({
  onLoggedIn,
  onIrParaCadastro,
}: {
  onLoggedIn: () => void;
  onIrParaCadastro: () => void;
}): JSX.Element {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function submit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      await login(email.trim(), senha);
      onLoggedIn();
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Falha no login.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: '2.5rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
          maxWidth: 400,
          width: '100%',
        }}
      >
        <p style={{ fontSize: 22, fontWeight: 800, color: '#2563eb', margin: '0 0 4px' }}>PHS Brasil</p>
        <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 20px' }}>Formulario de Maquinas</p>

        {erro && (
          <MessageBar messageBarType={MessageBarType.error} styles={{ root: { marginBottom: 12 } }}>
            {erro}
          </MessageBar>
        )}

        <TextField
          label="E-mail"
          type="email"
          required
          value={email}
          onChange={(_, v) => setEmail(v ?? '')}
          autoComplete="username"
        />
        <TextField
          label="Senha"
          type="password"
          required
          canRevealPassword
          value={senha}
          onChange={(_, v) => setSenha(v ?? '')}
          autoComplete="current-password"
          styles={{ root: { marginTop: 12 } }}
        />
        <PrimaryButton
          type="submit"
          text={carregando ? 'Entrando...' : 'Acessar'}
          disabled={carregando}
          styles={{ root: { width: '100%', marginTop: 20 } }}
        />

        <div style={{ marginTop: 16, textAlign: 'center', fontSize: 13, color: '#64748b' }}>
          Nao tem conta? <Link onClick={onIrParaCadastro} styles={{ root: { fontWeight: 600 } }}>Criar conta</Link>
        </div>
      </form>
    </div>
  );
}
