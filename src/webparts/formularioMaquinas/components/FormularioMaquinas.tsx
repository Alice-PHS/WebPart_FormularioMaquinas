import * as React from 'react';
import { useState, useEffect } from 'react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IFormularioMaquinasProps } from './IFormularioMaquinasProps';
import styles from './FormularioMaquinas.module.scss';

// Importando os 4 formulários
import FormInclusao from './FormInclusao';
import FormExclusao from './FormExclusao';
import FormSubstituicao from './FormSubstituicao';
import FormNovoUsuario from './FormNovoUsuario';

export default function FormularioMaquinas(props: IFormularioMaquinasProps) {
  const [mode, setMode] = useState<string | null>(null);
  const [chamado, setChamado] = useState<string | null>(null);
  const [nomeEmpresa, setNomeEmpresa] = useState<string>('');

  // 1. CORREÇÃO: A função foi movida para cima do useEffect
  const buscarEmpresaPorDominio = async (dominio: string) => {
    try {
      const siteUrl = "https://phsbrasilconsultoria.sharepoint.com";
      // Assumindo que o nome da empresa fica na coluna "Nome_x0020_fantasia"
      const query = `${siteUrl}/_api/web/lists/getbytitle('Clientes')/items?$select=Nome_x0020_fantasia,E_x002d_mail_x0020__x0028_Sponso&$filter=substringof('@${dominio}', E_x002d_mail_x0020__x0028_Sponso)`;

      const response: SPHttpClientResponse = await props.context.spHttpClient.get(
        query,
        SPHttpClient.configurations.v1
      );

      const data = await response.json();

      if (data && data.value && data.value.length > 0) {
        // Se encontrou, salva o nome fantasia
        setNomeEmpresa(data.value[0].Nome_x0020_fantasia);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do cliente:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setMode(params.get('mode'));
    setChamado(params.get('chamado'));

    // Lógica para buscar a empresa pelo domínio do e-mail
    if (props.userEmail) {
      const dominio = props.userEmail.split('@')[1]; // Pega tudo depois do @ (ex: cliente.com.br)
      if (dominio) {
        void buscarEmpresaPorDominio(dominio);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userEmail]);
  // Nota: Adicionei o comentário do eslint acima para ele não pedir para colocar a função nas dependências do useEffect.

  const renderContent = () => {
    switch (mode) {
      case 'inclusao': return <FormInclusao user={props.userDisplayName} numeroChamado={chamado} nomeEmpresa={nomeEmpresa} />;
      case 'exclusao': return <FormExclusao user={props.userDisplayName} numeroChamado={chamado} nomeEmpresa={nomeEmpresa} />;
      case 'substituicao': return <FormSubstituicao user={props.userDisplayName} numeroChamado={chamado} nomeEmpresa={nomeEmpresa} />;
      case 'novoUsuario': return <FormNovoUsuario user={props.userDisplayName} numeroChamado={chamado} nomeEmpresa={nomeEmpresa} />;
      default:
        return (
          <div className={styles.menuPrincipal}>
            <h1>Portal PHS Brasil</h1>
            <p>Você precisa ter recebido um email para acessar esta funcionalidade.</p>
          </div>
        );
    }
  };

  return (
    <div>
      <style>{`
        /* 1. Remove barras superiores do O365, SharePoint e Site */
        #sp-appBar, 
        div[class^="appBar_"],
        #SuiteNavWrapper, 
        #O365_NavHeader,
        div[class*="headerRow-"],
        div[data-automationid="MinimalHeader"],
        div[data-automationid="SiteHeader"],
        #sp-siteHeader {
            display: none !important;
        }

        /* 2. Remove as barras de comando (inclusive a específica do Workbench) */
        .ms-CommandBar,
        #spCommandBar,
        div[data-automation-id="CommandBar"],
        .workbenchCommandBar,
        div[data-sp-feature-tag="WorkbenchCommandBar"] {
            display: none !important;
        }

        /* 3. Remove o cabeçalho gigante com o Título da Página e o Menu Lateral */
        div[data-automation-id="pageHeader"],
        #spLeftNav {
            display: none !important;
        }

        /* 4. Zera margens e força o Canvas/Workbench a ocupar 100% da tela */
        div[data-automation-id="contentScrollRegion"], 
        .CanvasComponent,
        #workbenchPageContent,
        .SPCanvas-canvas,
        .CanvasZone {
            margin: 0 !important;
            padding: 0 !important;
            max-width: 100% !important;
        }
    `}</style>
      <section className={styles.formularioMaquinas}>
        {renderContent()}
      </section>
    </div>
  );
}