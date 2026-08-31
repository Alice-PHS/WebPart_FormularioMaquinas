import { useCallback, useEffect, useState } from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react';

import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import EsqueciSenhaScreen from './auth/EsqueciSenhaScreen';
import RedefinirSenhaScreen from './auth/RedefinirSenhaScreen';
import { clearToken, getToken, me, Usuario } from './auth/authClient';
import { lerTokenRecuperacao, limparTokenRecuperacao } from './formEntry';
import { buscarEmpresaPorDominio as buscarEmpresaApi } from './services/clientesService';
import FormularioMaquinas from './components/FormularioMaquinas';

type Estado = 'verificando' | 'deslogado' | 'logado';
type Tela = 'login' | 'cadastro' | 'esqueci';

export default function App(): JSX.Element {
  // O link de recuperacao vem do e-mail (?token=...). Ele tem prioridade sobre
  // qualquer sessao: quem clicou nele quer trocar a senha, nao entrar.
  const [tokenRecuperacao, setTokenRecuperacao] = useState<string>(() => lerTokenRecuperacao());
  const [estado, setEstado] = useState<Estado>(getToken() ? 'verificando' : 'deslogado');
  const [tela, setTela] = useState<Tela>('login');
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const carregarUsuario = useCallback(async () => {
    const u = await me();
    if (u) {
      setUsuario(u);
      setEstado('logado');
    } else {
      setEstado('deslogado');
    }
  }, []);

  useEffect(() => {
    if (!tokenRecuperacao && estado === 'verificando') void carregarUsuario();
  }, [tokenRecuperacao, estado, carregarUsuario]);

  const buscarEmpresaPorDominio = useCallback((dominio: string) => buscarEmpresaApi(dominio), []);

  /** Sai da tela de redefinicao e volta ao login, sem deixar o token para tras. */
  const encerrarRecuperacao = useCallback(() => {
    limparTokenRecuperacao();
    setTokenRecuperacao('');
    setTela('login');
  }, []);

  if (tokenRecuperacao) {
    return (
      <RedefinirSenhaScreen
        token={tokenRecuperacao}
        onSenhaRedefinida={() => {
          // A senha mudou: a sessao antiga (se houver) nao deve continuar.
          clearToken();
          setUsuario(null);
          setEstado('deslogado');
        }}
        onIrParaLogin={encerrarRecuperacao}
        onPedirNovoLink={() => {
          limparTokenRecuperacao();
          setTokenRecuperacao('');
          setTela('esqueci');
        }}
      />
    );
  }

  if (estado === 'verificando') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size={SpinnerSize.large} label="Carregando..." />
      </div>
    );
  }

  if (estado === 'deslogado') {
    if (tela === 'cadastro') {
      return (
        <RegisterScreen
          onCadastrado={() => setEstado('verificando')}
          onIrParaLogin={() => setTela('login')}
        />
      );
    }
    if (tela === 'esqueci') {
      return <EsqueciSenhaScreen onIrParaLogin={() => setTela('login')} />;
    }
    return (
      <LoginScreen
        onLoggedIn={() => setEstado('verificando')}
        onIrParaCadastro={() => setTela('cadastro')}
        onIrParaRecuperacao={() => setTela('esqueci')}
      />
    );
  }

  return (
    <FormularioMaquinas
      userEmail={usuario?.email ?? ''}
      buscarEmpresaPorDominio={buscarEmpresaPorDominio}
    />
  );
}
