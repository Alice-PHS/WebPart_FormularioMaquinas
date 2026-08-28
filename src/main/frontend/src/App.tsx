import { useCallback, useEffect, useState } from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react';

import LoginScreen from './auth/LoginScreen';
import RegisterScreen from './auth/RegisterScreen';
import { getToken, me, Usuario } from './auth/authClient';
import { buscarEmpresaPorDominio as buscarEmpresaApi } from './services/clientesService';
import FormularioMaquinas from './components/FormularioMaquinas';

type Estado = 'verificando' | 'deslogado' | 'logado';
type Tela = 'login' | 'cadastro';

export default function App(): JSX.Element {
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
    if (estado === 'verificando') void carregarUsuario();
  }, [estado, carregarUsuario]);

  const buscarEmpresaPorDominio = useCallback((dominio: string) => buscarEmpresaApi(dominio), []);

  if (estado === 'verificando') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size={SpinnerSize.large} label="Carregando..." />
      </div>
    );
  }

  if (estado === 'deslogado') {
    return tela === 'cadastro' ? (
      <RegisterScreen
        onCadastrado={() => setEstado('verificando')}
        onIrParaLogin={() => setTela('login')}
      />
    ) : (
      <LoginScreen
        onLoggedIn={() => setEstado('verificando')}
        onIrParaCadastro={() => setTela('cadastro')}
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
