import { FormEvent, useState } from 'react';
import { Link, MessageBar, MessageBarType, PrimaryButton, TextField } from '@fluentui/react';

import { LinkExpiradoError, redefinirSenha } from './authClient';
import Splash, { ATENCAO, CARD, FUNDO, SUCESSO } from './splash';

const SENHA_MINIMA = 8;

/** 'form' = pedindo a senha; os outros dois sao telas de desfecho. */
type Situacao = 'form' | 'sucesso' | 'expirado';

export default function RedefinirSenhaScreen({
  token,
  onSenhaRedefinida,
  onIrParaLogin,
  onPedirNovoLink,
}: {
  token: string;
  /** Disparado assim que a senha muda, para a sessao antiga nao continuar valendo. */
  onSenhaRedefinida: () => void;
  onIrParaLogin: () => void;
  onPedirNovoLink: () => void;
}): JSX.Element {
  const [situacao, setSituacao] = useState<Situacao>('form');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function submit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setErro(null);

    if (senha.length < SENHA_MINIMA) {
      setErro(`A senha precisa ter pelo menos ${SENHA_MINIMA} caracteres.`);
      return;
    }
    if (senha !== confirmacao) {
      setErro('As duas senhas nao sao iguais.');
      return;
    }

    setCarregando(true);
    try {
      await redefinirSenha(token, senha);
      onSenhaRedefinida();
      setSituacao('sucesso');
    } catch (err) {
      // Link vencido nao e erro de preenchimento: o formulario nao serve mais,
      // entao a tela inteira vira o aviso com o caminho de saida.
      if (err instanceof LinkExpiradoError) {
        setSituacao('expirado');
        return;
      }
      setErro(err instanceof Error ? err.message : 'Falha ao redefinir a senha.');
    } finally {
      setCarregando(false);
    }
  }

  if (situacao === 'sucesso') {
    return (
      <Splash
        cor={SUCESSO}
        simbolo="✓"
        titulo="Senha alterada com sucesso!"
        texto="Ja pode entrar com a sua senha nova. Por seguranca, o link que voce usou nao vale mais."
      >
        <PrimaryButton text="Ir para o login" onClick={onIrParaLogin} styles={{ root: { width: '100%' } }} />
      </Splash>
    );
  }

  if (situacao === 'expirado') {
    return (
      <Splash
        cor={ATENCAO}
        simbolo="!"
        titulo="Este link nao vale mais"
        texto="Links de recuperacao expiram em 30 minutos e so podem ser usados uma vez. Pedir um novo leva alguns segundos."
      >
        <PrimaryButton text="Pedir um link novo" onClick={onPedirNovoLink} styles={{ root: { width: '100%' } }} />
        <div style={{ marginTop: 16, fontSize: 13, color: '#64748b' }}>
          <Link onClick={onIrParaLogin} styles={{ root: { fontWeight: 600 } }}>Voltar ao login</Link>
        </div>
      </Splash>
    );
  }

  return (
    <div style={FUNDO}>
      <form onSubmit={submit} style={CARD}>
        <p style={{ fontSize: 22, fontWeight: 800, color: '#2563eb', margin: '0 0 4px' }}>PHS Brasil</p>
        <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 20px' }}>Criar uma senha nova</p>

        {erro && (
          <MessageBar messageBarType={MessageBarType.error} styles={{ root: { marginBottom: 12 } }}>
            {erro}
          </MessageBar>
        )}

        <TextField
          label="Nova senha"
          type="password"
          required
          canRevealPassword
          value={senha}
          onChange={(_, v) => setSenha(v ?? '')}
          autoComplete="new-password"
          description={`Minimo de ${SENHA_MINIMA} caracteres.`}
        />
        <TextField
          label="Repita a nova senha"
          type="password"
          required
          canRevealPassword
          value={confirmacao}
          onChange={(_, v) => setConfirmacao(v ?? '')}
          autoComplete="new-password"
          styles={{ root: { marginTop: 12 } }}
        />
        <PrimaryButton
          type="submit"
          text={carregando ? 'Salvando...' : 'Salvar senha'}
          disabled={carregando}
          styles={{ root: { width: '100%', marginTop: 20 } }}
        />

        <div style={{ marginTop: 16, textAlign: 'center', fontSize: 13, color: '#64748b' }}>
          <Link onClick={onIrParaLogin} styles={{ root: { fontWeight: 600 } }}>Voltar ao login</Link>
        </div>
      </form>
    </div>
  );
}
