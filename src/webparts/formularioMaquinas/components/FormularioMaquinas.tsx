import * as React from 'react';
import { useState, useEffect } from 'react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IFormularioMaquinasProps } from './IFormularioMaquinasProps';

import FormInclusao from './FormInclusao';
import FormExclusao from './FormExclusao';
import FormSubstituicao from './FormSubstituicao';
import FormNovoUsuario from './FormNovoUsuario';

export default function FormularioMaquinas(props: IFormularioMaquinasProps) {
  const [mode, setMode] = useState<string | null>(null);
  const [chamado, setChamado] = useState<string>('');
  const [nomeEmpresa, setNomeEmpresa] = useState<string>('');
  const [solicitanteEmail, setSolicitanteEmail] = useState<string>('');
  
  // NOVO ESTADO: Controle de acesso
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);

  const buscarEmpresaPorDominio = async (dominio: string) => {
    try {
      const siteUrl = 'https://phsbrasilconsultoria.sharepoint.com';
      const query = `${siteUrl}/_api/web/lists/getbytitle('Clientes')/items?$select=Nome_x0020_fantasia,E_x002d_mail_x0020__x0028_Sponso&$filter=substringof('@${dominio}', E_x002d_mail_x0020__x0028_Sponso)`;
      const response: SPHttpClientResponse = await props.context.spHttpClient.get(query, SPHttpClient.configurations.v1);
      const data = await response.json();
      if (data?.value?.length > 0) setNomeEmpresa(data.value[0].Nome_x0020_fantasia);
    } catch (error) {
      console.error('Erro ao buscar dados do cliente:', error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payload = params.get('payload');

    let modeParam = params.get('mode');
    let chamadoParam = params.get('chamado') || '';
    let clienteParam = params.get('cliente') || '';
    let emailParam = params.get('solicitanteEmail') || '';

    if (payload) {
      try {
        const decodedString = decodeURIComponent(escape(window.atob(payload)));
        const data = JSON.parse(decodedString);

        modeParam = data.mode || modeParam;
        chamadoParam = data.chamado || chamadoParam;
        clienteParam = data.cliente || clienteParam;
        emailParam = data.solicitanteEmail || emailParam;
      } catch (error) {
        console.error('Erro ao decodificar o payload Base64:', error);
      }
    }

    // VALIDAÇÃO DE SEGURANÇA: Compara os e-mails
    if (emailParam && props.userEmail) {
      const emailDoLink = emailParam.trim().toLowerCase();
      const emailLogado = props.userEmail.trim().toLowerCase();
      
      if (emailDoLink !== emailLogado) {
        setIsAuthorized(false); // Bloqueia o acesso
      }
    }

    setMode(modeParam);
    setChamado(chamadoParam);
    setSolicitanteEmail(emailParam);
    
    if (clienteParam) setNomeEmpresa(decodeURIComponent(clienteParam));

    if (window.history && window.history.replaceState) {
      const cleanUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
      window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
    }

    if (!clienteParam && props.userEmail) {
      const dominio = props.userEmail.split('@')[1];
      if (dominio) void buscarEmpresaPorDominio(dominio);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userEmail]);

  const renderContent = () => {
    // SE NÃO ESTIVER AUTORIZADO, RENDERIZA TELA DE ERRO
    if (!isAuthorized) {
      return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', maxWidth: '400px', width: '100%', borderTop: '4px solid #ef4444' }}>
            <p style={{ fontSize: '22px', fontWeight: 800, color: '#ef4444', margin: '0 0 8px' }}>Acesso Negado</p>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              Você não tem permissão para acessar este formulário. Este link foi gerado para outro usuário.
            </p>
          </div>
        </div>
      );
    }

    // CASO CONTRÁRIO, SEGUE O FLUXO NORMAL
    switch (mode) {
      case 'inclusao':     return <FormInclusao     numeroChamado={chamado} nomeEmpresa={nomeEmpresa} solicitanteEmail={solicitanteEmail} />;
      case 'exclusao':     return <FormExclusao     numeroChamado={chamado} nomeEmpresa={nomeEmpresa} solicitanteEmail={solicitanteEmail} />;
      case 'substituicao': return <FormSubstituicao numeroChamado={chamado} nomeEmpresa={nomeEmpresa} solicitanteEmail={solicitanteEmail} />;
      case 'novoUsuario':  return <FormNovoUsuario  numeroChamado={chamado} nomeEmpresa={nomeEmpresa} solicitanteEmail={solicitanteEmail} />;
      default:
        return (
          <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', maxWidth: '400px', width: '100%' }}>
              <p style={{ fontSize: '22px', fontWeight: 800, color: '#2563eb', margin: '0 0 8px' }}>PHS Brasil</p>
              <p style={{ fontSize: '14px', color: '#64748b' }}>Você precisa ter recebido um e-mail para acessar esta funcionalidade.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <style>{`
        #sp-appBar, div[class^="appBar_"], #SuiteNavWrapper, #O365_NavHeader,
        div[class*="headerRow-"], div[data-automationid="MinimalHeader"],
        div[data-automationid="SiteHeader"], #sp-siteHeader { display: none !important; }
        .ms-CommandBar, #spCommandBar, div[data-automation-id="CommandBar"],
        .workbenchCommandBar, div[data-sp-feature-tag="WorkbenchCommandBar"] { display: none !important; }
        div[data-automation-id="pageHeader"], #spLeftNav { display: none !important; }
        div[data-automation-id="contentScrollRegion"], .CanvasComponent,
        #workbenchPageContent, .SPCanvas-canvas, .CanvasZone {
          margin: 0 !important; padding: 0 !important; max-width: 100% !important;
        }
        * { box-sizing: border-box; }
      `}</style>
      {renderContent()}
    </div>
  );
}