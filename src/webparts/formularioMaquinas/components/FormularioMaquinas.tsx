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
  const [chamado, setChamado] = useState<string | null>(null);
  const [nomeEmpresa, setNomeEmpresa] = useState<string>('');

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
    setMode(params.get('mode'));
    setChamado(params.get('chamado'));

    // --- CÓDIGO NOVO: Limpa os parâmetros da URL após a leitura ---
    if (window.history && window.history.replaceState) {
      // Pega apenas o caminho base da URL, ignorando o que vem depois do "?"
      const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      // Substitui a URL atual pela versão limpa
      window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
    }
    // --------------------------------------------------------------

    if (props.userEmail) {
      const dominio = props.userEmail.split('@')[1];
      if (dominio) void buscarEmpresaPorDominio(dominio);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userEmail]);

  const renderContent = () => {
    switch (mode) {
      case 'inclusao': return <FormInclusao user={props.userDisplayName} numeroChamado={chamado} nomeEmpresa={nomeEmpresa} />;
      case 'exclusao': return <FormExclusao user={props.userDisplayName} numeroChamado={chamado} nomeEmpresa={nomeEmpresa} />;
      case 'substituicao': return <FormSubstituicao user={props.userDisplayName} numeroChamado={chamado} nomeEmpresa={nomeEmpresa} />;
      case 'novoUsuario': return <FormNovoUsuario user={props.userDisplayName} numeroChamado={chamado} nomeEmpresa={nomeEmpresa} />;
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
