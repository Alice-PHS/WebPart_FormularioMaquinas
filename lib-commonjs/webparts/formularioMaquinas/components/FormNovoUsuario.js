"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormNovoUsuario;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var react_1 = require("react");
var formStyles_1 = require("./formStyles");
var validation_1 = require("./validation");
var FLOW_URL = 'https://defaulte8fc68b65d194bf4a2c1a5ed5dc4c2.f5.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/ee360285171e4f5f8091be3cd4e5c204/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Gj4na39slMDwQmm-UCzvgS9GX0-ODgN9DV0mMcaX1Wk';
//make.powerautomate.com/environments/Default-e8fc68b6-5d19-4bf4-a2c1-a5ed5dc4c2f5/flows/2dea46ba-606d-4217-8319-ed9c39d7ff19
function FormNovoUsuario(_a) {
    var _this = this;
    var numeroChamado = _a.numeroChamado, nomeEmpresa = _a.nomeEmpresa, solicitanteEmail = _a.solicitanteEmail;
    var theme = formStyles_1.themes.novoUsuario;
    var S = (0, formStyles_1.makeStyles)(theme);
    var _b = (0, react_1.useState)(1), step = _b[0], setStep = _b[1];
    var totalSteps = 4;
    var _c = (0, react_1.useState)(false), showError = _c[0], setShowError = _c[1];
    var _d = (0, react_1.useState)(false), submitting = _d[0], setSubmitting = _d[1];
    var _e = (0, react_1.useState)('idle'), submitStatus = _e[0], setSubmitStatus = _e[1];
    // NOVO ESTADO: Controle de exibição do pop-up de discordância
    var _f = (0, react_1.useState)(false), showDisagreePopup = _f[0], setShowDisagreePopup = _f[1];
    var _g = (0, react_1.useState)({
        agreed: null,
        requesterName: '',
        companyName: nomeEmpresa || '',
        ticketNumber: numeroChamado || '',
        userNames: '',
        emails: '',
        departments: '',
        folders: '',
        teamViewerId: '',
        anyDeskId: '',
        programs: '',
        printers: '',
        referenceLogin: '',
    }), formData = _g[0], setFormData = _g[1];
    var update = function (field, value) {
        setFormData(function (p) {
            var _a;
            return (tslib_1.__assign(tslib_1.__assign({}, p), (_a = {}, _a[field] = value, _a)));
        });
        if (showError)
            setShowError(false);
    };
    var validate = function (s) {
        if (s === 1)
            return formData.agreed === true;
        if (s === 2)
            return formData.requesterName.trim();
        if (s === 3)
            return (formData.userNames.trim() && formData.emails.trim() && (0, validation_1.isValidEmailList)(formData.emails) && formData.departments.trim() &&
                formData.folders.trim() && formData.anyDeskId.trim() &&
                formData.programs.trim() && formData.referenceLogin.trim());
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
    var handleSubmit = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var payload, res, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    payload = {
                        tipoFormulario: 'novoUsuario',
                        solicitante: formData.requesterName,
                        solicitanteEmail: solicitanteEmail,
                        empresa: formData.companyName,
                        numeroChamado: formData.ticketNumber,
                        usuarios: formData.userNames,
                        emails: formData.emails,
                        departamentos: formData.departments,
                        especificacoesTecnicas: {
                            pastas: formData.folders,
                            teamViewer: formData.teamViewerId,
                            anyDesk: formData.anyDeskId,
                            programas: formData.programs,
                            impressoras: formData.printers,
                            loginReferencia: formData.referenceLogin,
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
    var inputFocus = function (e) { return (e.target.style.borderColor = theme.primary); };
    var inputBlur = function (e) { return (e.target.style.borderColor = '#d1d5db'); };
    return (React.createElement("div", { style: S.page },
        React.createElement("div", { style: S.container },
            React.createElement("div", { style: S.pageHeader },
                React.createElement("div", null,
                    React.createElement("p", { style: S.brandName }, "PHS Brasil"),
                    React.createElement("p", { style: S.brandSub }, "Configura\u00E7\u00E3o de Novo Usu\u00E1rio")),
                React.createElement("span", { style: S.stepBadge },
                    "Passo ",
                    step,
                    " de ",
                    totalSteps)),
            React.createElement("div", { style: S.progressTrack },
                React.createElement("div", { style: { height: '100%', width: "".concat((step / totalSteps) * 100, "%"), background: theme.primary, borderRadius: '999px', transition: 'width 0.4s ease' } })),
            React.createElement("div", { style: S.card },
                React.createElement("div", { style: S.cardBody },
                    step === 1 && (React.createElement("div", null,
                        React.createElement("div", { style: tslib_1.__assign(tslib_1.__assign({}, S.alertBox), { borderLeftColor: theme.primary, background: theme.primaryLight }) },
                            React.createElement("span", { style: { fontSize: '22px', flexShrink: 0 } }, "\u2139\uFE0F"),
                            React.createElement("div", null,
                                React.createElement("p", { style: tslib_1.__assign(tslib_1.__assign({}, S.alertTitle), { color: '#581c87' }) }, "Sobre esta solicita\u00E7\u00E3o"),
                                React.createElement("p", { style: tslib_1.__assign(tslib_1.__assign({}, S.alertText), { color: '#6b21a8' }) },
                                    "Esta solicita\u00E7\u00E3o visa incluir um ",
                                    React.createElement("strong", null, "novo usu\u00E1rio"),
                                    " a uma m\u00E1quina j\u00E1 gerenciada pela PHS Brasil.",
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    "N\u00E3o ser\u00E1 configurada m\u00E1quina nova ou substitui\u00E7\u00E3o de m\u00E1quina. Ao prosseguir, voc\u00EA declara estar ciente e de acordo."))),
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
                                "N\u00E3o li ou n\u00E3o estou de acordo.")))),
                    step === 2 && (React.createElement("div", null,
                        React.createElement("p", { style: S.sectionTitle }, "Qualifica\u00E7\u00E3o do Solicitante"),
                        React.createElement("span", { style: S.sectionSub }, "Sponsor ou pessoa autorizada por ele."),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label },
                                "Seu nome ",
                                React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            React.createElement("input", { style: S.input, type: "text", placeholder: "Nome completo", value: formData.requesterName, onChange: function (e) { return update('requesterName', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
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
                        React.createElement("p", { style: S.sectionTitle }, "Dados da(s) Inclus\u00E3o(\u00F5es)"),
                        React.createElement("span", { style: S.sectionSub }, "Forne\u00E7a os dados t\u00E9cnicos necess\u00E1rios para a configura\u00E7\u00E3o."),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label },
                                "Nome completo do(s) usu\u00E1rio(s) ",
                                React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            React.createElement("textarea", { style: tslib_1.__assign(tslib_1.__assign({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Insira o(s) nome(s) completo(s)", value: formData.userNames, onChange: function (e) { return update('userNames', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label },
                                "E-mail(s) ",
                                React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            React.createElement("textarea", { style: tslib_1.__assign(tslib_1.__assign({}, S.textarea), { minHeight: '56px', borderColor: showError && formData.emails.trim() && !(0, validation_1.isValidEmailList)(formData.emails) ? '#ef4444' : undefined }), rows: 2, placeholder: "Insira o(s) e-mail(s), separados por v\u00EDrgula caso haja mais de um", value: formData.emails, onChange: function (e) { return update('emails', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }),
                            showError && formData.emails.trim() && !(0, validation_1.isValidEmailList)(formData.emails) && (React.createElement("span", { style: { fontSize: '12px', color: '#ef4444', marginTop: '4px', display: 'block' } }, "Um ou mais e-mails informados s\u00E3o inv\u00E1lidos."))),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label },
                                "Departamento(s) ",
                                React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            React.createElement("textarea", { style: tslib_1.__assign(tslib_1.__assign({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Insira o(s) departamento(s)", value: formData.departments, onChange: function (e) { return update('departments', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label },
                                "Quais pastas ser\u00E3o acessadas na rede/nuvem? ",
                                React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            React.createElement("textarea", { style: tslib_1.__assign(tslib_1.__assign({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Insira sua resposta", value: formData.folders, onChange: function (e) { return update('folders', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        React.createElement("div", { style: S.grid2 },
                            React.createElement("div", { style: S.group },
                                React.createElement("label", { style: S.label },
                                    "ID Team Viewer ",
                                    React.createElement("span", { style: { color: '#94a3b8', fontWeight: 400 } }, "(Opcional)")),
                                React.createElement("input", { style: S.input, type: "text", placeholder: "Ex: 123 456 789", value: formData.teamViewerId, onChange: function (e) { return update('teamViewerId', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                            React.createElement("div", { style: S.group },
                                React.createElement("label", { style: S.label },
                                    "ID AnyDesk ",
                                    React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                React.createElement("input", { style: S.input, type: "text", placeholder: "Ex: 987 654 321", value: formData.anyDeskId, onChange: function (e) { return update('anyDeskId', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }),
                                React.createElement("span", { style: S.helpText },
                                    React.createElement("a", { href: "https://anydesk.com/pt/downloads", target: "_blank", rel: "noopener noreferrer", style: { color: theme.primary } }, "Baixar AnyDesk \u2192")))),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label },
                                "Quais programas necessitam ser instalados? ",
                                React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            React.createElement("textarea", { style: tslib_1.__assign(tslib_1.__assign({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Ex: Emissor de NF, Certificados digitais...", value: formData.programs, onChange: function (e) { return update('programs', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label }, "Quais impressoras ser\u00E3o utilizadas?"),
                            React.createElement("textarea", { style: tslib_1.__assign(tslib_1.__assign({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Insira sua resposta", value: formData.printers, onChange: function (e) { return update('printers', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        React.createElement("div", { style: tslib_1.__assign(tslib_1.__assign({}, S.group), { background: theme.primaryLight, border: "1px solid ".concat(theme.primaryLighter), borderRadius: '10px', padding: '1rem' }) },
                            React.createElement("label", { style: tslib_1.__assign(tslib_1.__assign({}, S.label), { color: '#581c87' }) },
                                "Login de refer\u00EAncia ",
                                React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            React.createElement("input", { style: S.input, type: "text", placeholder: "Ex: maria.silva", value: formData.referenceLogin, onChange: function (e) { return update('referenceLogin', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }),
                            React.createElement("span", { style: tslib_1.__assign(tslib_1.__assign({}, S.helpText), { color: '#7e22ce', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.3px' }) }, "Login de um colaborador no mesmo departamento para efeito de referenciamento.")))),
                    step === 4 && (React.createElement("div", null,
                        React.createElement("div", { style: { textAlign: 'center', marginBottom: '2rem' } },
                            React.createElement("div", { style: { width: '64px', height: '64px', borderRadius: '50%', background: theme.primaryLighter, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 12px' } }, "\u2713"),
                            React.createElement("p", { style: tslib_1.__assign(tslib_1.__assign({}, S.sectionTitle), { textAlign: 'center' }) }, "Pronto para enviar!"),
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
                            React.createElement("div", { style: { padding: '12px 16px', borderBottom: '1px solid #f1f5f9' } },
                                React.createElement("span", { style: S.reviewLabel }, "Usu\u00E1rios"),
                                React.createElement("span", { style: S.reviewValue }, formData.userNames || '—')),
                            React.createElement("div", { style: { padding: '12px 16px', borderBottom: '1px solid #f1f5f9' } },
                                React.createElement("span", { style: S.reviewLabel }, "E-mails"),
                                React.createElement("span", { style: S.reviewValue }, formData.emails || '—')),
                            React.createElement("div", { style: { padding: '12px 16px' } },
                                React.createElement("span", { style: S.reviewLabel }, "Departamentos"),
                                React.createElement("span", { style: S.reviewValue }, formData.departments || '—'))),
                        React.createElement("div", { style: tslib_1.__assign(tslib_1.__assign({}, S.alertBox), { marginTop: '1.5rem', borderLeftColor: theme.primary, background: theme.primaryLight }) },
                            React.createElement("span", { style: { fontSize: '22px', flexShrink: 0 } }, "\uD83D\uDCAC"),
                            React.createElement("div", null,
                                React.createElement("p", { style: tslib_1.__assign(tslib_1.__assign({}, S.alertTitle), { color: '#581c87' }) }, "N\u00E3o tem certeza sobre sua necessidade?"),
                                React.createElement("p", { style: tslib_1.__assign(tslib_1.__assign({}, S.alertText), { color: '#6b21a8' }) },
                                    "Consulte nossos t\u00E9cnicos: WhatsApp (11) 3945-1934 ou ",
                                    React.createElement("a", { href: "mailto:suporte@phsbrasil.com.br", style: { color: theme.primary } }, "suporte@phsbrasil.com.br")))))),
                    submitStatus === 'error' && (React.createElement("div", { style: S.errorBanner }, "\u26A0 Erro ao enviar. Tente novamente ou entre em contato com o suporte.")),
                    showError && step !== 1 && (React.createElement("div", { style: S.errorBanner }, "\u26A0 Por favor, preencha todos os campos obrigat\u00F3rios (*) antes de avan\u00E7ar."))),
                React.createElement("div", { style: S.cardFooter },
                    step > 1 ? React.createElement("button", { style: S.btnPrev, onClick: prev }, "\u2190 Voltar") : React.createElement("div", null),
                    step < totalSteps ? (React.createElement("button", { style: S.btnNext, onClick: next }, "Pr\u00F3ximo \u2192")) : (submitStatus === 'success' ? (React.createElement("button", { style: tslib_1.__assign(tslib_1.__assign({}, S.btnSubmit), { background: '#16a34a', cursor: 'default' }), disabled: true }, "\u2713 Enviado com sucesso!")) : (React.createElement("button", { style: tslib_1.__assign(tslib_1.__assign({}, S.btnSubmit), { opacity: submitting ? 0.7 : 1 }), onClick: handleSubmit, disabled: submitting }, submitting ? 'Enviando...' : 'Enviar Solicitação'))))),
            React.createElement("div", { style: S.helpFooter },
                React.createElement("p", { style: { marginBottom: '6px', fontWeight: 500, color: '#64748b' } }, "N\u00E3o tem certeza se precisa de novo usu\u00E1rio ou nova m\u00E1quina?"),
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
//# sourceMappingURL=FormNovoUsuario.js.map