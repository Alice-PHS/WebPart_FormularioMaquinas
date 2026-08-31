"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormInclusao;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_1 = require("react");
var formStyles_1 = require("./formStyles");
var validation_1 = require("./validation");
var FLOW_URL = 'https://defaulte8fc68b65d194bf4a2c1a5ed5dc4c2.f5.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/ee360285171e4f5f8091be3cd4e5c204/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Gj4na39slMDwQmm-UCzvgS9GX0-ODgN9DV0mMcaX1Wk';
function FormInclusao(_a) {
    var _this = this;
    var numeroChamado = _a.numeroChamado, nomeEmpresa = _a.nomeEmpresa, solicitanteEmail = _a.solicitanteEmail;
    var theme = formStyles_1.themes.inclusao;
    var S = (0, formStyles_1.makeStyles)(theme);
    var _b = (0, react_1.useState)(1), step = _b[0], setStep = _b[1];
    var totalSteps = 6;
    var _c = (0, react_1.useState)(false), showError = _c[0], setShowError = _c[1];
    var _d = (0, react_1.useState)(false), submitting = _d[0], setSubmitting = _d[1];
    var _e = (0, react_1.useState)('idle'), submitStatus = _e[0], setSubmitStatus = _e[1];
    // NOVO ESTADO: Controle de exibição do pop-up de discordância
    var _f = (0, react_1.useState)(false), showDisagreePopup = _f[0], setShowDisagreePopup = _f[1];
    var _g = (0, react_1.useState)({
        agreed: false,
        requesterName: '',
        companyName: nomeEmpresa || '',
        ticketNumber: numeroChamado || '',
        users: [{ name: '', email: '', department: '' }],
        folders: '', teamViewer: '', anyDesk: '', programs: '', printers: '', referenceLogin: '',
        needsTransfer: false,
        transferData: {
            oldMachineName: '', filesToTransfer: '', programsToTransfer: '',
            transferBrowserFavs: false, transferEmailSignatures: false,
        },
    }), formData = _g[0], setFormData = _g[1];
    var update = function (field, value) {
        setFormData(function (p) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, p), (_a = {}, _a[field] = value, _a)));
        });
        if (showError)
            setShowError(false);
    };
    var updateTransfer = function (field, value) {
        return setFormData(function (p) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, p), { transferData: tslib_1.__assign(tslib_1.__assign({}, p.transferData), (_a = {}, _a[field] = value, _a)) }));
        });
    };
    var updateUser = function (i, field, value) {
        var _a;
        var arr = tslib_1.__spreadArray([], formData.users, true);
        arr[i] = tslib_1.__assign(tslib_1.__assign({}, arr[i]), (_a = {}, _a[field] = value, _a));
        setFormData(function (p) { return (tslib_1.__assign(tslib_1.__assign({}, p), { users: arr })); });
    };
    var addUser = function () { return setFormData(function (p) { return (tslib_1.__assign(tslib_1.__assign({}, p), { users: tslib_1.__spreadArray(tslib_1.__spreadArray([], p.users, true), [{ name: '', email: '', department: '' }], false) })); }); };
    var removeUser = function (i) {
        if (formData.users.length === 1)
            return;
        setFormData(function (p) { return (tslib_1.__assign(tslib_1.__assign({}, p), { users: p.users.filter(function (_, idx) { return idx !== i; }) })); });
    };
    var validate = function (s) {
        if (s === 1)
            return formData.agreed === true;
        if (s === 2)
            return formData.requesterName.trim();
        if (s === 3)
            return formData.users.every(function (u) { return u.name.trim() && u.email.trim() && (0, validation_1.isValidEmail)(u.email) && u.department.trim(); });
        if (s === 4)
            return formData.folders.trim() && formData.programs.trim() && formData.referenceLogin.trim();
        if (s === 5)
            return !formData.needsTransfer || formData.transferData.oldMachineName.trim();
        return true;
    };
    var next = function () {
        // 1. Adicione esta verificação bem no início da função
        if (step === 1 && formData.agreed === false) {
            setShowDisagreePopup(true);
            return;
        }
        // 2. Mantenha o resto da função como já era
        if (validate(step)) {
            setShowError(false);
            setStep(function (s) { return s + 1; });
        }
        else {
            setShowError(true);
        }
    };
    var prev = function () { setShowError(false); setStep(function (s) { return s - 1; }); };
    var progress = (step / totalSteps) * 100;
    var handleSubmit = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var payload, res, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    payload = {
                        tipoFormulario: 'inclusao',
                        solicitante: formData.requesterName,
                        solicitanteEmail: solicitanteEmail,
                        empresa: formData.companyName,
                        numeroChamado: formData.ticketNumber,
                        maquinas: formData.users.map(function (u) { return ({
                            nomeUsuario: u.name,
                            email: u.email,
                            departamento: u.department,
                        }); }),
                        especificacoesTecnicas: {
                            pastas: formData.folders,
                            teamViewer: formData.teamViewer,
                            anyDesk: formData.anyDesk,
                            programas: formData.programs,
                            impressoras: formData.printers,
                            loginReferencia: formData.referenceLogin,
                        },
                        transferenciaDados: {
                            necessaria: formData.needsTransfer,
                            maquinaAntiga: formData.transferData.oldMachineName,
                            arquivos: formData.transferData.filesToTransfer,
                            programas: formData.transferData.programsToTransfer,
                            favoritosNavegador: formData.transferData.transferBrowserFavs,
                            assinaturasOutlook: formData.transferData.transferEmailSignatures,
                        },
                    };
                    setSubmitting(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetch(FLOW_URL, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload),
                        })];
                case 2:
                    res = _b.sent();
                    setSubmitStatus(res.ok ? 'success' : 'error');
                    return [3 /*break*/, 5];
                case 3:
                    _a = _b.sent();
                    setSubmitStatus('error');
                    return [3 /*break*/, 5];
                case 4:
                    setSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var inputFocus = function (e) {
        return (e.target.style.borderColor = theme.primary);
    };
    var inputBlur = function (e) {
        return (e.target.style.borderColor = '#d1d5db');
    };
    return (React.createElement("div", { style: S.page },
        React.createElement("div", { style: S.container },
            React.createElement("div", { style: S.pageHeader },
                React.createElement("div", null,
                    React.createElement("p", { style: S.brandName }, "PHS Brasil"),
                    React.createElement("p", { style: S.brandSub }, "Inclus\u00E3o em Gerenciamento")),
                React.createElement("span", { style: S.stepBadge },
                    "Passo ",
                    step,
                    " de ",
                    totalSteps)),
            React.createElement("div", { style: S.progressTrack },
                React.createElement("div", { style: { height: '100%', width: "".concat(progress, "%"), background: theme.primary, borderRadius: '999px', transition: 'width 0.4s ease' } })),
            React.createElement("div", { style: S.card },
                React.createElement("div", { style: S.cardBody },
                    step === 1 && (React.createElement("div", null,
                        React.createElement("div", { style: S.alertBox },
                            React.createElement("span", { style: { fontSize: '22px', flexShrink: 0 } }, "\u26A0\uFE0F"),
                            React.createElement("div", null,
                                React.createElement("p", { style: S.alertTitle }, "Aviso Importante"),
                                React.createElement("p", { style: S.alertText },
                                    "Ao preencher e enviar este formul\u00E1rio, voc\u00EA est\u00E1 solicitando \u00E0 equipe t\u00E9cnica da ",
                                    React.createElement("strong", null, "PHS Brasil Consultoria em Inform\u00E1tica"),
                                    " que inclua as m\u00E1quinas descritas neste documento em seu contrato de gerenciamento cont\u00EDnuo.",
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    React.createElement("strong", null, "Aten\u00E7\u00E3o:"),
                                    " Isso poder\u00E1 acarretar em acr\u00E9scimos nos valores pagos atualmente, de acordo com as cl\u00E1usulas previstas em seu contrato."))),
                        React.createElement("div", { style: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' } },
                            React.createElement("label", { style: tslib_1.__assign(tslib_1.__assign({}, S.label), { marginBottom: '1rem' }) },
                                "Voc\u00EA leu o aviso acima e est\u00E1 ciente do prop\u00F3sito desta solicita\u00E7\u00E3o? ",
                                React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            React.createElement("label", { style: S.radioCard(formData.agreed === true) },
                                React.createElement("input", { type: "radio", name: "agreed", checked: formData.agreed === true, onChange: function () { return update('agreed', true); }, style: { accentColor: theme.primary } }),
                                "Sim, li e estou de acordo."),
                            React.createElement("label", { style: S.radioCard(formData.agreed === false && formData.agreed !== null) },
                                React.createElement("input", { type: "radio", name: "agreed", checked: formData.agreed === false, 
                                    // Só atualiza o estado agora, sem chamar o modal aqui
                                    onChange: function () { return update('agreed', false); } }),
                                "N\u00E3o li ou n\u00E3o estou de acordo.")),
                        showError && formData.agreed === false && (React.createElement("div", { style: S.errorBanner }, "\u26A0 Voc\u00EA precisa estar de acordo para prosseguir com a inclus\u00E3o.")))),
                    step === 2 && (React.createElement("div", null,
                        React.createElement("p", { style: S.sectionTitle }, "Qualifica\u00E7\u00E3o do Solicitante"),
                        React.createElement("span", { style: S.sectionSub }, "Informe os dados de quem est\u00E1 autorizando esta inclus\u00E3o."),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label },
                                "Seu nome ",
                                React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            React.createElement("input", { style: S.input, type: "text", placeholder: "Ponto focal ou pessoa autorizada", value: formData.requesterName, onChange: function (e) { return update('requesterName', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label }, "E-mail"),
                            React.createElement("input", { style: tslib_1.__assign(tslib_1.__assign({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: solicitanteEmail, readOnly: true })),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label }, "Nome da empresa"),
                            React.createElement("input", { style: tslib_1.__assign(tslib_1.__assign({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: formData.companyName, readOnly: true })),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label }, "N\u00FAmero do chamado"),
                            React.createElement("input", { style: tslib_1.__assign(tslib_1.__assign({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: formData.ticketNumber, readOnly: true })))),
                    step === 3 && (React.createElement("div", null,
                        React.createElement("p", { style: S.sectionTitle }, "Dados das Inclus\u00F5es"),
                        React.createElement("span", { style: S.sectionSub }, "Adicione as m\u00E1quinas preenchendo os dados b\u00E1sicos dos usu\u00E1rios."),
                        formData.users.map(function (u, i) { return (React.createElement("div", { key: i, style: S.itemCard },
                            React.createElement("div", { style: S.itemCardHeader },
                                React.createElement("span", null,
                                    "\uD83D\uDCBB M\u00E1quina ",
                                    i + 1),
                                formData.users.length > 1 && (React.createElement("button", { onClick: function () { return removeUser(i); }, style: tslib_1.__assign(tslib_1.__assign({}, S.iconBtn), { color: '#ef4444' }), title: "Remover" }, "\uD83D\uDDD1"))),
                            React.createElement("div", { style: S.itemCardBody },
                                React.createElement("div", { style: tslib_1.__assign(tslib_1.__assign({}, S.group), { marginBottom: '12px' }) },
                                    React.createElement("label", { style: S.label },
                                        "Nome completo do usu\u00E1rio ",
                                        React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                    React.createElement("input", { style: S.input, type: "text", placeholder: "Ex: Jo\u00E3o da Silva", value: u.name, onChange: function (e) { return updateUser(i, 'name', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                                React.createElement("div", { style: S.grid2 },
                                    React.createElement("div", null,
                                        React.createElement("label", { style: S.label },
                                            "E-mail ",
                                            React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                        React.createElement("input", { style: tslib_1.__assign(tslib_1.__assign({}, S.input), { borderColor: showError && u.email.trim() && !(0, validation_1.isValidEmail)(u.email) ? '#ef4444' : undefined }), type: "email", placeholder: "joao@empresa.com.br", value: u.email, onChange: function (e) { return updateUser(i, 'email', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }),
                                        showError && u.email.trim() && !(0, validation_1.isValidEmail)(u.email) && (React.createElement("span", { style: { fontSize: '12px', color: '#ef4444', marginTop: '4px', display: 'block' } }, "E-mail inv\u00E1lido."))),
                                    React.createElement("div", null,
                                        React.createElement("label", { style: S.label },
                                            "Departamento ",
                                            React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                        React.createElement("input", { style: S.input, type: "text", placeholder: "Ex: Financeiro", value: u.department, onChange: function (e) { return updateUser(i, 'department', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })))))); }),
                        React.createElement("button", { style: S.btnAddMore, onClick: addUser }, "\uFF0B Adicionar mais uma m\u00E1quina"))),
                    step === 4 && (React.createElement("div", null,
                        React.createElement("p", { style: S.sectionTitle }, "Especifica\u00E7\u00F5es T\u00E9cnicas"),
                        React.createElement("span", { style: S.sectionSub }, "Detalhes de acessos, softwares e impressoras necess\u00E1rios."),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label },
                                "Quais pastas ser\u00E3o acessadas na rede/nuvem? ",
                                React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            React.createElement("textarea", { style: tslib_1.__assign(tslib_1.__assign({}, S.textarea), { minHeight: '60px' }), rows: 2, placeholder: "Ex: Servidor Z: // P\u00FAblico / Departamento Pessoal / OneDrive Geral", value: formData.folders, onChange: function (e) { return update('folders', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        React.createElement("div", { style: S.grid2 },
                            React.createElement("div", { style: S.group },
                                React.createElement("label", { style: S.label },
                                    "ID Team Viewer ",
                                    React.createElement("span", { style: { color: '#94a3b8', fontWeight: 400 } }, "(Opcional)")),
                                React.createElement("input", { style: S.input, type: "text", placeholder: "Ex: 123 456 789", value: formData.teamViewer, onChange: function (e) { return update('teamViewer', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                            React.createElement("div", { style: S.group },
                                React.createElement("label", { style: S.label },
                                    "ID AnyDesk ",
                                    React.createElement("span", { style: { color: '#94a3b8', fontWeight: 400 } }, "(Opcional)")),
                                React.createElement("input", { style: S.input, type: "text", placeholder: "Ex: 987 654 321", value: formData.anyDesk, onChange: function (e) { return update('anyDesk', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }),
                                React.createElement("span", { style: S.helpText },
                                    React.createElement("a", { href: "https://anydesk.com/pt/downloads", target: "_blank", rel: "noopener noreferrer", style: { color: theme.primary } }, "Baixar AnyDesk \u2192")))),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label },
                                "Quais programas necessitam ser instalados? ",
                                React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            React.createElement("textarea", { style: tslib_1.__assign(tslib_1.__assign({}, S.textarea), { minHeight: '60px' }), rows: 2, placeholder: "Ex: Pacote Office, Emissor de NF, Certificados Digitais...", value: formData.programs, onChange: function (e) { return update('programs', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label }, "Quais impressoras ser\u00E3o utilizadas? "),
                            React.createElement("input", { style: S.input, type: "text", placeholder: "Ex: Impressora HP RH, Plotter Engenharia", value: formData.printers, onChange: function (e) { return update('printers', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        React.createElement("div", { style: tslib_1.__assign(tslib_1.__assign({}, S.group), { background: theme.primaryLight, border: "1px solid ".concat(theme.primaryLighter), borderRadius: '10px', padding: '1rem' }) },
                            React.createElement("label", { style: tslib_1.__assign(tslib_1.__assign({}, S.label), { color: '#1e3a8a' }) },
                                "Login de refer\u00EAncia ",
                                React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            React.createElement("input", { style: S.input, type: "text", placeholder: "Ex: maria.silva", value: formData.referenceLogin, onChange: function (e) { return update('referenceLogin', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }),
                            React.createElement("span", { style: tslib_1.__assign(tslib_1.__assign({}, S.helpText), { color: '#1e40af', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.3px' }) }, "Login de um colaborador no mesmo departamento para c\u00F3pia de permiss\u00F5es.")))),
                    step === 5 && (React.createElement("div", null,
                        React.createElement("p", { style: S.sectionTitle }, "Transfer\u00EAncia de Dados"),
                        React.createElement("span", { style: S.sectionSub }, "Indique se ser\u00E1 necess\u00E1rio realizar backup de uma m\u00E1quina antiga para a nova."),
                        React.createElement("div", { style: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.25rem' } },
                            React.createElement("label", { style: tslib_1.__assign(tslib_1.__assign({}, S.label), { marginBottom: '1rem' }) }, "Haver\u00E1 transfer\u00EAncia de arquivos ou configura\u00E7\u00F5es de uma m\u00E1quina antiga?"),
                            React.createElement("div", { style: { display: 'flex', gap: '12px' } },
                                React.createElement("button", { style: S.toggleBtn(formData.needsTransfer), onClick: function () { return update('needsTransfer', true); } }, "\u2713 Sim, necessito transfer\u00EAncia"),
                                React.createElement("button", { style: S.toggleBtn(!formData.needsTransfer, '#64748b'), onClick: function () { return update('needsTransfer', false); } }, "N\u00E3o, m\u00E1quina zerada"))),
                        formData.needsTransfer && (React.createElement("div", { style: { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' } },
                            React.createElement("div", { style: S.group },
                                React.createElement("label", { style: S.label },
                                    "Identifica\u00E7\u00E3o da M\u00E1quina Antiga ",
                                    React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                React.createElement("input", { style: S.input, type: "text", placeholder: "Ex: PC-CONTABILIDADE-02 ou Patrim\u00F4nio 1599", value: formData.transferData.oldMachineName, onChange: function (e) { return updateTransfer('oldMachineName', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                            React.createElement("div", { style: S.group },
                                React.createElement("label", { style: S.label }, "Arquivos e Pastas Espec\u00EDficas"),
                                React.createElement("textarea", { style: tslib_1.__assign(tslib_1.__assign({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Ex: C:\\Sistemas\\NFe, Meus Documentos...", value: formData.transferData.filesToTransfer, onChange: function (e) { return updateTransfer('filesToTransfer', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                            React.createElement("div", { style: S.group },
                                React.createElement("label", { style: S.label }, "Configura\u00E7\u00F5es de Softwares"),
                                React.createElement("textarea", { style: tslib_1.__assign(tslib_1.__assign({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Ex: Token banc\u00E1rio, Senhas do sistema ERP...", value: formData.transferData.programsToTransfer, onChange: function (e) { return updateTransfer('programsToTransfer', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                            React.createElement("label", { style: tslib_1.__assign(tslib_1.__assign({}, S.label), { marginBottom: '8px' }) }, "Itens Comuns:"),
                            React.createElement("label", { style: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151', marginBottom: '8px' } },
                                React.createElement("input", { type: "checkbox", checked: formData.transferData.transferBrowserFavs, onChange: function (e) { return updateTransfer('transferBrowserFavs', e.target.checked); }, style: { accentColor: theme.primary } }),
                                "Favoritos do Navegador (Chrome/Edge)"),
                            React.createElement("label", { style: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151' } },
                                React.createElement("input", { type: "checkbox", checked: formData.transferData.transferEmailSignatures, onChange: function (e) { return updateTransfer('transferEmailSignatures', e.target.checked); }, style: { accentColor: theme.primary } }),
                                "Assinaturas e contatos do Outlook"))))),
                    step === 6 && (React.createElement("div", null,
                        React.createElement("div", { style: { textAlign: 'center', marginBottom: '2rem' } },
                            React.createElement("div", { style: { width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 12px' } }, "\u2713"),
                            React.createElement("p", { style: tslib_1.__assign(tslib_1.__assign({}, S.sectionTitle), { textAlign: 'center' }) }, "Tudo pronto para enviar!"),
                            React.createElement("span", { style: { fontSize: '13px', color: '#94a3b8' } }, "Revise o resumo antes de enviar.")),
                        React.createElement("div", { style: S.reviewBox },
                            React.createElement("div", { style: S.reviewHeader },
                                React.createElement("div", null,
                                    React.createElement("span", { style: S.reviewLabel }, "Solicitante"),
                                    React.createElement("span", { style: S.reviewValue }, formData.requesterName)),
                                React.createElement("div", null,
                                    React.createElement("span", { style: S.reviewLabel }, "Empresa"),
                                    React.createElement("span", { style: S.reviewValue }, formData.companyName)),
                                React.createElement("div", null,
                                    React.createElement("span", { style: S.reviewLabel }, "Chamado"),
                                    React.createElement("span", { style: S.reviewValue },
                                        "#",
                                        formData.ticketNumber))),
                            React.createElement("div", { style: { padding: '1rem 1.25rem', borderBottom: '1px solid #f1f5f9' } },
                                React.createElement("span", { style: S.reviewLabel }, "Total de M\u00E1quinas"),
                                React.createElement("span", { style: tslib_1.__assign(tslib_1.__assign({}, S.reviewValue), { fontSize: '20px', color: theme.primary }) }, formData.users.length)),
                            React.createElement("div", { style: { padding: '1rem 1.25rem' } },
                                React.createElement("span", { style: S.reviewLabel }, "Transfer\u00EAncia de Dados"),
                                React.createElement("span", { style: S.reviewValue }, formData.needsTransfer ? "\u2713 Sim \u2014 ".concat(formData.transferData.oldMachineName) : '✗ Não necessária'))))),
                    submitStatus === 'error' && (React.createElement("div", { style: S.errorBanner }, "\u26A0 Erro ao enviar. Tente novamente ou entre em contato com o suporte.")),
                    showError && step !== 1 && (React.createElement("div", { style: S.errorBanner }, "\u26A0 Por favor, preencha todos os campos obrigat\u00F3rios (*) antes de avan\u00E7ar."))),
                React.createElement("div", { style: S.cardFooter },
                    step > 1 ? (React.createElement("button", { style: S.btnPrev, onClick: prev }, "\u2190 Voltar")) : React.createElement("div", null),
                    step < totalSteps ? (React.createElement("button", { style: S.btnNext, onClick: next }, "Pr\u00F3ximo \u2192")) : submitStatus === 'success' ? (React.createElement("button", { style: tslib_1.__assign(tslib_1.__assign({}, S.btnSubmit), { background: '#16a34a', cursor: 'default' }), disabled: true }, "\u2713 Enviado com sucesso!")) : (React.createElement("button", { style: tslib_1.__assign(tslib_1.__assign({}, S.btnSubmit), { opacity: submitting ? 0.7 : 1 }), onClick: handleSubmit, disabled: submitting }, submitting ? 'Enviando...' : 'Enviar Solicitação')))),
            React.createElement("div", { style: S.helpFooter },
                React.createElement("p", { style: { marginBottom: '6px', fontWeight: 500, color: '#64748b' } }, "N\u00E3o tenho certeza se quero adicionar ou substituir equipamento."),
                React.createElement("a", { href: "https://wa.me/+551139451934", target: "_blank", rel: "noopener noreferrer", style: { color: '#16a34a', fontWeight: 500, marginRight: '16px' } }, "WhatsApp (11) 3945-1934"),
                React.createElement("a", { href: "mailto:suporte@phsbrasil.com.br", style: { color: theme.primary, fontWeight: 500 } }, "suporte@phsbrasil.com.br"))),
        showDisagreePopup && (React.createElement("div", { style: {
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(3px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
            } },
            React.createElement("div", { style: {
                    background: '#ffffff', borderRadius: '16px', padding: '2rem',
                    width: '90%', maxWidth: '450px', textAlign: 'center',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                } },
                React.createElement("h3", { style: { fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '1rem' } }, "Aten\u00E7\u00E3o"),
                React.createElement("p", { style: { color: '#475569', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' } },
                    "Caro cliente,",
                    React.createElement("br", null),
                    "Voc\u00EA poder\u00E1 nos consultar via atendimento para tratar quaisquer d\u00FAvidas referentes a este assunto."),
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' } },
                    React.createElement("a", { href: "mailto:sucessodocliente@phsbrasil.com.br", style: {
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            background: theme.primary, color: '#fff', textDecoration: 'none',
                            padding: '12px', borderRadius: '8px', fontWeight: 500, fontSize: '0.95rem'
                        } }, "\u2709\uFE0F sucessodocliente@phsbrasil.com.br"),
                    React.createElement("a", { href: "https://wa.me/551139451934", target: "_blank", rel: "noopener noreferrer", style: {
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            background: '#16a34a', color: '#fff', textDecoration: 'none',
                            padding: '12px', borderRadius: '8px', fontWeight: 500, fontSize: '0.95rem'
                        } }, "\uD83D\uDCF1 WhatsApp: (11) 3945-1934")),
                React.createElement("button", { onClick: function () { return setShowDisagreePopup(false); }, style: {
                        width: '100%', padding: '10px', background: '#f1f5f9', color: '#475569',
                        border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight: 600,
                        cursor: 'pointer', transition: 'background 0.2s'
                    } }, "Fechar"))))));
}
//# sourceMappingURL=FormInclusao.js.map