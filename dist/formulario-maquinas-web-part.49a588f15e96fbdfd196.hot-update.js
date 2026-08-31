"use strict";
self["webpackHotUpdatea6b61804_85fc_43d3_8837_8a99fb111bda_0_0_1"]("formulario-maquinas-web-part",{

/***/ 399:
/*!**************************************************************************!*\
  !*** ./lib/webparts/formularioMaquinas/components/FormularioMaquinas.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormularioMaquinas)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-http */ 909);
/* harmony import */ var _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FormInclusao__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FormInclusao */ 498);
/* harmony import */ var _FormExclusao__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FormExclusao */ 572);
/* harmony import */ var _FormSubstituicao__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FormSubstituicao */ 245);
/* harmony import */ var _FormNovoUsuario__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FormNovoUsuario */ 328);








function FormularioMaquinas(props) {
    var _this = this;
    var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null), mode = _a[0], setMode = _a[1];
    var _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''), chamado = _b[0], setChamado = _b[1];
    var _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''), nomeEmpresa = _c[0], setNomeEmpresa = _c[1];
    var _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''), solicitanteEmail = _d[0], setSolicitanteEmail = _d[1];
    // NOVO ESTADO: Controle de acesso
    var _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true), isAuthorized = _e[0], setIsAuthorized = _e[1];
    var buscarEmpresaPorDominio = function (dominio) { return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(_this, void 0, void 0, function () {
        var siteUrl, query, response, data, error_1;
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    siteUrl = 'https://phsbrasilconsultoria.sharepoint.com';
                    query = "".concat(siteUrl, "/_api/web/lists/getbytitle('Clientes')/items?$select=Nome_x0020_fantasia,E_x002d_mail_x0020__x0028_Sponso&$filter=substringof('@").concat(dominio, "', E_x002d_mail_x0020__x0028_Sponso)");
                    return [4 /*yield*/, props.context.spHttpClient.get(query, _microsoft_sp_http__WEBPACK_IMPORTED_MODULE_1__.SPHttpClient.configurations.v1)];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _b.sent();
                    if (((_a = data === null || data === void 0 ? void 0 : data.value) === null || _a === void 0 ? void 0 : _a.length) > 0)
                        setNomeEmpresa(data.value[0].Nome_x0020_fantasia);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error('Erro ao buscar dados do cliente:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        var params = new URLSearchParams(window.location.search);
        var payload = params.get('payload');
        var modeParam = params.get('mode');
        var chamadoParam = params.get('chamado') || '';
        var clienteParam = params.get('cliente') || '';
        var emailParam = params.get('solicitanteEmail') || '';
        if (payload) {
            try {
                var decodedString = decodeURIComponent(escape(window.atob(payload)));
                var data = JSON.parse(decodedString);
                modeParam = data.mode || modeParam;
                chamadoParam = data.chamado || chamadoParam;
                clienteParam = data.cliente || clienteParam;
                emailParam = data.solicitanteEmail || emailParam;
            }
            catch (error) {
                console.error('Erro ao decodificar o payload Base64:', error);
            }
        }
        // VALIDAÇÃO DE SEGURANÇA: Compara os e-mails
        if (emailParam && props.userEmail) {
            var emailDoLink = emailParam.trim().toLowerCase();
            var emailLogado = props.userEmail.trim().toLowerCase();
            if (emailDoLink !== emailLogado) {
                setIsAuthorized(false); // Bloqueia o acesso
            }
        }
        setMode(modeParam);
        setChamado(chamadoParam);
        setSolicitanteEmail(emailParam);
        if (clienteParam)
            setNomeEmpresa(decodeURIComponent(clienteParam));
        if (window.history && window.history.replaceState) {
            var cleanUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
            window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
        }
        if (!clienteParam && props.userEmail) {
            var dominio = props.userEmail.split('@')[1];
            if (dominio)
                void buscarEmpresaPorDominio(dominio);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.userEmail]);
    var renderContent = function () {
        // SE NÃO ESTIVER AUTORIZADO, RENDERIZA TELA DE ERRO
        if (!isAuthorized) {
            return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', system-ui, sans-serif" } },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { background: '#fff', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', maxWidth: '400px', width: '100%', borderTop: '4px solid #ef4444' } },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: { fontSize: '22px', fontWeight: 800, color: '#ef4444', margin: '0 0 8px' } }, "Acesso Negado"),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: { fontSize: '14px', color: '#64748b' } }, "Voc\u00EA n\u00E3o tem permiss\u00E3o para acessar este formul\u00E1rio. Este link foi gerado para outro usu\u00E1rio."))));
        }
        // CASO CONTRÁRIO, SEGUE O FLUXO NORMAL
        switch (mode) {
            case 'inclusao': return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_FormInclusao__WEBPACK_IMPORTED_MODULE_2__["default"], { numeroChamado: chamado, nomeEmpresa: nomeEmpresa, solicitanteEmail: solicitanteEmail });
            case 'exclusao': return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_FormExclusao__WEBPACK_IMPORTED_MODULE_3__["default"], { numeroChamado: chamado, nomeEmpresa: nomeEmpresa, solicitanteEmail: solicitanteEmail });
            case 'substituicao': return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_FormSubstituicao__WEBPACK_IMPORTED_MODULE_4__["default"], { numeroChamado: chamado, nomeEmpresa: nomeEmpresa, solicitanteEmail: solicitanteEmail });
            case 'novoUsuario': return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_FormNovoUsuario__WEBPACK_IMPORTED_MODULE_5__["default"], { numeroChamado: chamado, nomeEmpresa: nomeEmpresa, solicitanteEmail: solicitanteEmail });
            default:
                return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', system-ui, sans-serif" } },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { background: '#fff', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', maxWidth: '400px', width: '100%' } },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: { fontSize: '22px', fontWeight: 800, color: '#2563eb', margin: '0 0 8px' } }, "PHS Brasil"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: { fontSize: '14px', color: '#64748b' } }, "Voc\u00EA precisa ter recebido um e-mail para acessar esta funcionalidade."))));
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("style", null, "\n        #sp-appBar, div[class^=\"appBar_\"], #SuiteNavWrapper, #O365_NavHeader,\n        div[class*=\"headerRow-\"], div[data-automationid=\"MinimalHeader\"],\n        div[data-automationid=\"SiteHeader\"], #sp-siteHeader { display: none !important; }\n        .ms-CommandBar, #spCommandBar, div[data-automation-id=\"CommandBar\"],\n        .workbenchCommandBar, div[data-sp-feature-tag=\"WorkbenchCommandBar\"] { display: none !important; }\n        div[data-automation-id=\"pageHeader\"], #spLeftNav { display: none !important; }\n        div[data-automation-id=\"contentScrollRegion\"], .CanvasComponent,\n        #workbenchPageContent, .SPCanvas-canvas, .CanvasZone {\n          margin: 0 !important; padding: 0 !important; max-width: 100% !important;\n        }\n        * { box-sizing: border-box; }\n      "),
        renderContent()));
}
/*import * as React from 'react';
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
    
    // Captura o payload camuflado em Base64
    const payload = params.get('payload');

    // Variáveis temporárias para guardar os dados
    let modeParam = params.get('mode');
    let chamadoParam = params.get('chamado') || '';
    let clienteParam = params.get('cliente') || '';
    let emailParam = params.get('solicitanteEmail') || '';

    // Se houver um payload, decodifica e sobrescreve os parâmetros
    if (payload) {
      try {
        // Decodifica o Base64 suportando caracteres especiais em Português (UTF-8)
        const decodedString = decodeURIComponent(escape(window.atob(payload)));
        const data = JSON.parse(decodedString);

        // Extrai as propriedades do JSON montado no Automate
        modeParam = data.mode || modeParam;
        chamadoParam = data.chamado || chamadoParam;
        clienteParam = data.cliente || clienteParam;
        emailParam = data.solicitanteEmail || emailParam;
      } catch (error) {
        console.error('Erro ao decodificar o payload Base64:', error);
      }
    }

    setMode(modeParam);
    setChamado(chamadoParam);
    setSolicitanteEmail(emailParam);
    
    // Define o nome da empresa se tiver sido passado
    if (clienteParam) setNomeEmpresa(decodeURIComponent(clienteParam));

    // Limpa a barra de endereços (Excelente prática que você já tinha!)
    if (window.history && window.history.replaceState) {
      const cleanUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
      window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
    }

    // Busca cliente por domínio, caso não tenha vindo no payload
    if (!clienteParam && props.userEmail) {
      const dominio = props.userEmail.split('@')[1];
      if (dominio) void buscarEmpresaPorDominio(dominio);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userEmail]);

  const renderContent = () => {
    switch (mode) {
      case 'inclusao':    return <FormInclusao    numeroChamado={chamado} nomeEmpresa={nomeEmpresa} solicitanteEmail={solicitanteEmail} />;
      case 'exclusao':    return <FormExclusao    numeroChamado={chamado} nomeEmpresa={nomeEmpresa} solicitanteEmail={solicitanteEmail} />;
      case 'substituicao': return <FormSubstituicao numeroChamado={chamado} nomeEmpresa={nomeEmpresa} solicitanteEmail={solicitanteEmail} />;
      case 'novoUsuario': return <FormNovoUsuario numeroChamado={chamado} nomeEmpresa={nomeEmpresa} solicitanteEmail={solicitanteEmail} />;
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
}*/


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d96b4c169fd1ceddc3d8")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=formulario-maquinas-web-part.49a588f15e96fbdfd196.hot-update.js.map