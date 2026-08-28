import { FormEvent, useState } from 'react';
import { Link, MessageBar, MessageBarType, PrimaryButton, TextField } from '@fluentui/react';

import { login, register } from './authClient';

export default function RegisterScreen({
  onCadastrado,
  onIrParaLogin,
}: {
  onCadastrado: () => void;
  onIrParaLogin: () => void;
}): JSX.Element {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function submit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setErro(null);

    if (senha.length < 6) {
      setErro('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }
    if (senha !== confirmar) {
      setErro('As senhas nao conferem.');
      return;
    }

    setCarregando(true);
    try {
      await register(nome.trim(), email.trim(), senha);
      await login(email.trim(), senha);
      onCadastrado();
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Falha no cadastro.');
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
        <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 20px' }}>Criar conta</p>

        {erro && (
          <MessageBar messageBarType={MessageBarType.error} styles={{ root: { marginBottom: 12 } }}>
            {erro}
          </MessageBar>
        )}

        <TextField
          label="Nome"
          required
          value={nome}
          onChange={(_, v) => setNome(v ?? '')}
          autoComplete="name"
        />
        <TextField
          label="E-mail"
          type="email"
          required
          value={email}
          onChange={(_, v) => setEmail(v ?? '')}
          autoComplete="username"
          styles={{ root: { marginTop: 12 } }}
        />
        <TextField
          label="Senha"
          type="password"
          required
          canRevealPassword
          value={senha}
          onChange={(_, v) => setSenha(v ?? '')}
          autoComplete="new-password"
          styles={{ root: { marginTop: 12 } }}
        />
        <TextField
          label="Confirmar senha"
          type="password"
          required
          canRevealPassword
          value={confirmar}
          onChange={(_, v) => setConfirmar(v ?? '')}
          autoComplete="new-password"
          styles={{ root: { marginTop: 12 } }}
        />
        <PrimaryButton
          type="submit"
          text={carregando ? 'Criando...' : 'Cadastrar'}
          disabled={carregando}
          styles={{ root: { width: '100%', marginTop: 20 } }}
        />

        <div style={{ marginTop: 16, textAlign: 'center', fontSize: 13, color: '#64748b' }}>
          Ja tem conta? <Link onClick={onIrParaLogin} styles={{ root: { fontWeight: 600 } }}>Acessar</Link>
        </div>
      </form>
    </div>
  );
}
