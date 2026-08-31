"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormularioMaquinas;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_1 = require("react");
var sp_http_1 = require("@microsoft/sp-http");
var FormInclusao_1 = tslib_1.__importDefault(require("./FormInclusao"));
var FormExclusao_1 = tslib_1.__importDefault(require("./FormExclusao"));
var FormSubstituicao_1 = tslib_1.__importDefault(require("./FormSubstituicao"));
var FormNovoUsuario_1 = tslib_1.__importDefault(require("./FormNovoUsuario"));
var FULLSCREEN_STYLE = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 99999,
    overflowY: 'auto',
    boxSizing: 'border-box',
};
var normalizeMaquinas = function (raw) {
    if (!Array.isArray(raw))
        return [];
    return raw
        .map(function (m) { return ({
        tag: (m === null || m === void 0 ? void 0 : m.tag) ? String(m.tag) : '',
        hostname: (m === null || m === void 0 ? void 0 : m.hostname) ? String(m.hostname) : '',
        equCodigo: (m === null || m === void 0 ? void 0 : m.equCodigo) !== undefined && (m === null || m === void 0 ? void 0 : m.equCodigo) !== null && (m === null || m === void 0 ? void 0 : m.equCodigo) !== '' ? Number(m.equCodigo) : null,
        departamento: (m === null || m === void 0 ? void 0 : m.departamento) ? String(m.departamento) : '',
    }); })
        .filter(function (m) { return m.tag || m.hostname; });
};
var parseMaquinasParam = function (raw) {
    if (!raw)
        return [];
    try {
        var parsed = JSON.parse(decodeURIComponent(raw));
        return normalizeMaquinas(parsed);
    }
    catch (error) {
        console.error('Erro ao decodificar o parâmetro maquinas:', error);
        return [];
    }
};
function FormularioMaquinas(props) {
    var _this = this;
    var _a = (0, react_1.useState)(null), mode = _a[0], setMode = _a[1];
    var _b = (0, react_1.useState)(''), chamado = _b[0], setChamado = _b[1];
    var _c = (0, react_1.useState)(''), nomeEmpresa = _c[0], setNomeEmpresa = _c[1];
    var _d = (0, react_1.useState)(''), solicitanteEmail = _d[0], setSolicitanteEmail = _d[1];
    var _e = (0, react_1.useState)(''), tag = _e[0], setTag = _e[1];
    var _f = (0, react_1.useState)(''), hostname = _f[0], setHostname = _f[1];
    var _g = (0, react_1.useState)(''), equCodigo = _g[0], setEquCodigo = _g[1];
    var _h = (0, react_1.useState)(''), departamento = _h[0], setDepartamento = _h[1];
    var _j = (0, react_1.useState)([]), maquinas = _j[0], setMaquinas = _j[1];
    // NOVO ESTADO: Controle de acesso
    var _k = (0, react_1.useState)(true), isAuthorized = _k[0], setIsAuthorized = _k[1];
    var buscarEmpresaPorDominio = function (dominio) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var siteUrl, query, response, data, error_1;
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    siteUrl = 'https://phsbrasilconsultoria.sharepoint.com';
                    query = "".concat(siteUrl, "/_api/web/lists/getbytitle('Clientes')/items?$select=Nome_x0020_fantasia,E_x002d_mail_x0020__x0028_Sponso&$filter=substringof('@").concat(dominio, "', E_x002d_mail_x0020__x0028_Sponso)");
                    return [4 /*yield*/, props.context.spHttpClient.get(query, sp_http_1.SPHttpClient.configurations.v1)];
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
    (0, react_1.useEffect)(function () {
        var params = new URLSearchParams(window.location.search);
        var payload = params.get('payload');
        var modeParam = params.get('mode');
        var chamadoParam = params.get('chamado') || '';
        var clienteParam = params.get('cliente') || '';
        var emailParam = params.get('solicitanteEmail') || '';
        var tagParam = params.get('tag') || '';
        var hostnameParam = params.get('hostname') || '';
        var equCodigoParam = params.get('equCodigo') || '';
        var departamentoParam = params.get('departamento') || '';
        var maquinasParam = parseMaquinasParam(params.get('maquinas'));
        if (payload) {
            try {
                var decodedString = decodeURIComponent(escape(window.atob(payload)));
                var data = JSON.parse(decodedString);
                modeParam = data.mode || modeParam;
                chamadoParam = data.chamado || chamadoParam;
                clienteParam = data.cliente || clienteParam;
                emailParam = data.solicitanteEmail || emailParam;
                tagParam = data.tag || tagParam;
                hostnameParam = data.hostname || hostnameParam;
                equCodigoParam = data.equCodigo || equCodigoParam;
                departamentoParam = data.departamento || departamentoParam;
                if (data.maquinas) {
                    maquinasParam = Array.isArray(data.maquinas)
                        ? normalizeMaquinas(data.maquinas)
                        : parseMaquinasParam(data.maquinas);
                }
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
        setTag(tagParam);
        setHostname(hostnameParam);
        setEquCodigo(equCodigoParam);
        setDepartamento(departamentoParam);
        setMaquinas(maquinasParam);
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
            return (React.createElement("div", { style: { minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', system-ui, sans-serif" } },
                React.createElement("div", { style: { background: '#fff', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', maxWidth: '400px', width: '100%', borderTop: '4px solid #ef4444' } },
                    React.createElement("p", { style: { fontSize: '22px', fontWeight: 800, color: '#ef4444', margin: '0 0 8px' } }, "Acesso Negado"),
                    React.createElement("p", { style: { fontSize: '14px', color: '#64748b' } }, "Voc\u00EA n\u00E3o tem permiss\u00E3o para acessar este formul\u00E1rio. Este link foi gerado para outro usu\u00E1rio."))));
        }
        // CASO CONTRÁRIO, SEGUE O FLUXO NORMAL
        switch (mode) {
            case 'inclusao': return React.createElement(FormInclusao_1.default, { numeroChamado: chamado, nomeEmpresa: nomeEmpresa, solicitanteEmail: solicitanteEmail });
            case 'exclusao': return React.createElement(FormExclusao_1.default, { numeroChamado: chamado, nomeEmpresa: nomeEmpresa, solicitanteEmail: solicitanteEmail, tag: tag, hostname: hostname, equCodigo: equCodigo, departamento: departamento, maquinas: maquinas });
            case 'substituicao': return React.createElement(FormSubstituicao_1.default, { numeroChamado: chamado, nomeEmpresa: nomeEmpresa, solicitanteEmail: solicitanteEmail, tag: tag, hostname: hostname, equCodigo: equCodigo, departamento: departamento, maquinas: maquinas });
            case 'novoUsuario': return React.createElement(FormNovoUsuario_1.default, { numeroChamado: chamado, nomeEmpresa: nomeEmpresa, solicitanteEmail: solicitanteEmail });
            default:
                return (React.createElement("div", { style: { minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', system-ui, sans-serif" } },
                    React.createElement("div", { style: { background: '#fff', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', maxWidth: '400px', width: '100%' } },
                        React.createElement("p", { style: { fontSize: '22px', fontWeight: 800, color: '#2563eb', margin: '0 0 8px' } }, "PHS Brasil"),
                        React.createElement("p", { style: { fontSize: '14px', color: '#64748b' } }, "Voc\u00EA precisa ter recebido um e-mail para acessar esta funcionalidade."))));
        }
    };
    return (React.createElement("div", { style: FULLSCREEN_STYLE },
        React.createElement("style", null, "\n        #sp-appBar, div[class^=\"appBar_\"], #SuiteNavWrapper, #O365_NavHeader,\n        div[class*=\"headerRow-\"], div[data-automationid=\"MinimalHeader\"],\n        div[data-automationid=\"SiteHeader\"], #sp-siteHeader { display: none !important; }\n        .ms-CommandBar, #spCommandBar, div[data-automation-id=\"CommandBar\"],\n        .workbenchCommandBar, div[data-sp-feature-tag=\"WorkbenchCommandBar\"] { display: none !important; }\n        div[data-automation-id=\"pageHeader\"], #spLeftNav { display: none !important; }\n        div[data-automation-id=\"contentScrollRegion\"], .CanvasComponent,\n        #workbenchPageContent, .SPCanvas-canvas, .CanvasZone {\n          margin: 0 !important; padding: 0 !important; max-width: 100% !important;\n        }\n        * { box-sizing: border-box; }\n      "),
        renderContent()));
}
//# sourceMappingURL=FormularioMaquinas.js.map