import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
import * as React from 'react';
import { useState } from 'react';
import { makeStyles, themes } from './formStyles';
import { isValidEmail } from './validation';
var FLOW_URL = 'https://defaulte8fc68b65d194bf4a2c1a5ed5dc4c2.f5.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/ee360285171e4f5f8091be3cd4e5c204/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Gj4na39slMDwQmm-UCzvgS9GX0-ODgN9DV0mMcaX1Wk';
var blankReplacement = function () { return ({
    oldTag: '', oldEmail: '', oldDepartment: '', oldHostname: '', oldEquCodigo: '', newAnyDesk: '', sameUser: true,
    newUser: { name: '', email: '', department: '' }, needsTransfer: false, transferDetails: { files: '', programs: '' },
}); };
var blankNewMachineShared = function () { return ({
    newAnyDesk: '', sameUser: true, newUser: { name: '', email: '', department: '' }, needsTransfer: false, transferDetails: { files: '', programs: '' },
}); };
export default function FormSubstituicao(_a) {
    var _this = this;
    var numeroChamado = _a.numeroChamado, nomeEmpresa = _a.nomeEmpresa, solicitanteEmail = _a.solicitanteEmail, tag = _a.tag, hostname = _a.hostname, equCodigo = _a.equCodigo, departamento = _a.departamento, maquinas = _a.maquinas;
    var theme = themes.substituicao;
    var S = makeStyles(theme);
    var _b = useState(1), step = _b[0], setStep = _b[1];
    var totalSteps = 4;
    var _c = useState(false), showError = _c[0], setShowError = _c[1];
    var _d = useState(false), submitting = _d[0], setSubmitting = _d[1];
    var _e = useState('idle'), submitStatus = _e[0], setSubmitStatus = _e[1];
    // Controle de exibição do pop-up de discordância
    var _f = useState(false), showDisagreePopup = _f[0], setShowDisagreePopup = _f[1];
    // LOTE: 2+ máquinas vieram selecionadas na tabela do PAG
    var isLote = !!maquinas && maquinas.length >= 2;
    var maquinaPreSelecionada = !isLote && !!(tag || hostname || equCodigo);
    var _g = useState(isLote ? maquinas : []), loteMaquinas = _g[0], setLoteMaquinas = _g[1];
    var _h = useState(blankNewMachineShared()), loteNewMachine = _h[0], setLoteNewMachine = _h[1];
    var removeLoteMaquina = function (i) {
        if (loteMaquinas.length === 1)
            return;
        setLoteMaquinas(function (prev) { return prev.filter(function (_, idx) { return idx !== i; }); });
    };
    var updateLoteNew = function (field, value) { return setLoteNewMachine(function (p) {
        var _a;
        return (__assign(__assign({}, p), (_a = {}, _a[field] = value, _a)));
    }); };
    var updateLoteNewUser = function (field, value) { return setLoteNewMachine(function (p) {
        var _a;
        return (__assign(__assign({}, p), { newUser: __assign(__assign({}, p.newUser), (_a = {}, _a[field] = value, _a)) }));
    }); };
    var updateLoteTransfer = function (field, value) { return setLoteNewMachine(function (p) {
        var _a;
        return (__assign(__assign({}, p), { transferDetails: __assign(__assign({}, p.transferDetails), (_a = {}, _a[field] = value, _a)) }));
    }); };
    var _j = useState({
        agreed: null,
        requesterName: '',
        companyName: nomeEmpresa || '',
        ticketNumber: numeroChamado || '',
        replacements: [__assign(__assign({}, blankReplacement()), { oldTag: tag || '', oldHostname: hostname || '', oldEquCodigo: equCodigo || '', oldDepartment: departamento || '' })],
    }), formData = _j[0], setFormData = _j[1];
    var update = function (field, value) { setFormData(function (p) {
        var _a;
        return (__assign(__assign({}, p), (_a = {}, _a[field] = value, _a)));
    }); if (showError)
        setShowError(false); };
    var updateRep = function (i, field, value) {
        var _a;
        var arr = __spreadArray([], formData.replacements, true);
        arr[i] = __assign(__assign({}, arr[i]), (_a = {}, _a[field] = value, _a));
        setFormData(function (p) { return (__assign(__assign({}, p), { replacements: arr })); });
    };
    var updateNewUser = function (i, field, value) {
        var _a;
        var arr = __spreadArray([], formData.replacements, true);
        arr[i] = __assign(__assign({}, arr[i]), { newUser: __assign(__assign({}, arr[i].newUser), (_a = {}, _a[field] = value, _a)) });
        setFormData(function (p) { return (__assign(__assign({}, p), { replacements: arr })); });
    };
    var updateTransfer = function (i, field, value) {
        var _a;
        var arr = __spreadArray([], formData.replacements, true);
        arr[i] = __assign(__assign({}, arr[i]), { transferDetails: __assign(__assign({}, arr[i].transferDetails), (_a = {}, _a[field] = value, _a)) });
        setFormData(function (p) { return (__assign(__assign({}, p), { replacements: arr })); });
    };
    var addReplacement = function () { return setFormData(function (p) { return (__assign(__assign({}, p), { replacements: __spreadArray(__spreadArray([], p.replacements, true), [blankReplacement()], false) })); }); };
    var removeReplacement = function (i) {
        if (formData.replacements.length === 1)
            return;
        setFormData(function (p) { return (__assign(__assign({}, p), { replacements: p.replacements.filter(function (_, idx) { return idx !== i; }) })); });
    };
    var validate = function (s) {
        if (s === 1)
            return formData.agreed === true;
        if (s === 2)
            return formData.requesterName.trim();
        if (s === 3)
            return isLote
                ? loteMaquinas.length > 0 && (loteNewMachine.sameUser || (loteNewMachine.newUser.name.trim() && loteNewMachine.newUser.email.trim() && isValidEmail(loteNewMachine.newUser.email) && loteNewMachine.newUser.department.trim()))
                : formData.replacements.every(function (r) {
                    var oldOk = r.oldTag.trim() && r.oldEmail.trim() && isValidEmail(r.oldEmail) && r.oldDepartment.trim();
                    var newOk = r.sameUser || (r.newUser.name.trim() && r.newUser.email.trim() && isValidEmail(r.newUser.email) && r.newUser.department.trim());
                    return oldOk && newOk;
                });
        return true;
    };
    // ATUALIZADO: Intercepta o clique no botão "Próximo" para abrir o pop-up
    var next = function () {
        if (step === 1 && formData.agreed === false) {
            setShowDisagreePopup(true);
            return;
        }
        if (validate(step)) {
            setShowError(false);
            setStep(function (s) { return s + 1; });
        }
        else {
            setShowError(true);
        }
    };
    var prev = function () { setShowError(false); setStep(function (s) { return s - 1; }); };
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var substituicoes, payload, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    substituicoes = isLote
                        ? loteMaquinas.map(function (m) { return ({
                            maquinaAntiga: {
                                tag: m.tag,
                                emailUsuario: '',
                                departamento: '',
                                hostname: m.hostname || '',
                                equCodigo: m.equCodigo !== null ? String(m.equCodigo) : '',
                            },
                            maquinaNova: {
                                anyDesk: loteNewMachine.newAnyDesk,
                                mesmoUsuario: loteNewMachine.sameUser,
                                novoUsuario: loteNewMachine.sameUser ? null : {
                                    nome: loteNewMachine.newUser.name,
                                    email: loteNewMachine.newUser.email,
                                    departamento: loteNewMachine.newUser.department,
                                },
                            },
                            transferenciaDados: {
                                necessaria: loteNewMachine.needsTransfer,
                                arquivos: loteNewMachine.transferDetails.files,
                                programas: loteNewMachine.transferDetails.programs,
                            },
                        }); })
                        : formData.replacements.map(function (r) { return ({
                            maquinaAntiga: {
                                tag: r.oldTag,
                                emailUsuario: r.oldEmail,
                                departamento: r.oldDepartment,
                                hostname: r.oldHostname || '',
                                equCodigo: r.oldEquCodigo || '',
                            },
                            maquinaNova: {
                                anyDesk: r.newAnyDesk,
                                mesmoUsuario: r.sameUser,
                                novoUsuario: r.sameUser ? null : {
                                    nome: r.newUser.name,
                                    email: r.newUser.email,
                                    departamento: r.newUser.department,
                                },
                            },
                            transferenciaDados: {
                                necessaria: r.needsTransfer,
                                arquivos: r.transferDetails.files,
                                programas: r.transferDetails.programs,
                            },
                        }); });
                    payload = {
                        tipoFormulario: 'substituicao',
                        solicitante: formData.requesterName,
                        solicitanteEmail: solicitanteEmail,
                        empresa: formData.companyName,
                        numeroChamado: formData.ticketNumber,
                        substituicoes: substituicoes,
                        resumoMaquinas: substituicoes.map(function (s) { return "TAG: ".concat(s.maquinaAntiga.tag, " / Host: ").concat(s.maquinaAntiga.hostname); }).join('; '),
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
                    React.createElement("p", { style: S.brandSub }, "Substitui\u00E7\u00E3o de Equipamentos")),
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
                        React.createElement("div", { style: S.alertBox },
                            React.createElement("span", { style: { fontSize: '22px', flexShrink: 0 } }, "\u26A0\uFE0F"),
                            React.createElement("div", null,
                                React.createElement("p", { style: S.alertTitle }, "Termo de Substitui\u00E7\u00E3o"),
                                React.createElement("p", { style: S.alertText },
                                    "Ao solicitar uma substitui\u00E7\u00E3o, voc\u00EA entende que a ",
                                    React.createElement("strong", null, "m\u00E1quina substitu\u00EDda (Antiga)"),
                                    " ser\u00E1 retirada de nosso gerenciamento.",
                                    React.createElement("br", null),
                                    React.createElement("br", null),
                                    "Bem como a ",
                                    React.createElement("strong", null, "m\u00E1quina colocada em seu lugar (Nova)"),
                                    " deve permanecer em nosso contrato por no m\u00EDnimo ",
                                    React.createElement("strong", null, "06 meses"),
                                    ", sem possibilidade de exclus\u00E3o e/ou nova substitui\u00E7\u00E3o da mesma."))),
                        React.createElement("div", { style: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' } },
                            React.createElement("label", { style: __assign(__assign({}, S.label), { marginBottom: '1rem' }) },
                                "Voc\u00EA leu o aviso acima e est\u00E1 ciente da pol\u00EDtica de car\u00EAncia (06 meses)? ",
                                React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            React.createElement("label", { style: S.radioCard(formData.agreed === true) },
                                React.createElement("input", { type: "radio", name: "agreed", checked: formData.agreed === true, onChange: function () { return update('agreed', true); }, style: { accentColor: theme.primary } }),
                                "Sim, li e estou de acordo."),
                            React.createElement("label", { style: S.radioCard(formData.agreed === false && formData.agreed !== null) },
                                React.createElement("input", { type: "radio", name: "agreed", checked: formData.agreed === false, onChange: function () { return update('agreed', false); } }),
                                "N\u00E3o li ou n\u00E3o estou de acordo.")))),
                    step === 2 && (React.createElement("div", null,
                        React.createElement("p", { style: S.sectionTitle }, "Qualifica\u00E7\u00E3o do Solicitante"),
                        React.createElement("span", { style: S.sectionSub }, "Informe os dados do Sponsor ou pessoa autorizada para esta troca."),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label },
                                "Seu nome ",
                                React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            React.createElement("input", { style: S.input, type: "text", placeholder: "Sponsor ou pessoa autorizada por ele", value: formData.requesterName, onChange: function (e) { return update('requesterName', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label }, "E-mail"),
                            React.createElement("input", { style: __assign(__assign({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: solicitanteEmail, readOnly: true })),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label }, "Nome da empresa"),
                            React.createElement("input", { style: __assign(__assign({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: formData.companyName, readOnly: true })),
                        React.createElement("div", { style: S.group },
                            React.createElement("label", { style: S.label }, "N\u00FAmero do chamado"),
                            React.createElement("input", { style: __assign(__assign({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: formData.ticketNumber, readOnly: true })))),
                    step === 3 && (React.createElement("div", null,
                        React.createElement("p", { style: S.sectionTitle }, "Mapeamento de Substitui\u00E7\u00F5es"),
                        React.createElement("span", { style: S.sectionSub }, "Vincule cada m\u00E1quina antiga com a respectiva m\u00E1quina nova."),
                        maquinaPreSelecionada && (React.createElement("div", { style: { background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '8px', padding: '10px 14px', margin: '12px 0', fontSize: '13px', color: '#9a3412' } }, "\u2139 Identifica\u00E7\u00E3o pr\u00E9-preenchida a partir da m\u00E1quina selecionada. Voc\u00EA pode editar se necess\u00E1rio.")),
                        isLote ? (React.createElement(React.Fragment, null,
                            React.createElement("div", { style: { background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', marginBottom: '12px' } },
                                React.createElement("p", { style: { fontSize: '12px', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' } },
                                    "\uD83D\uDDA5 1. M\u00E1quinas que ser\u00E3o retiradas (Antigas) \u2014 ",
                                    loteMaquinas.length),
                                loteMaquinas.map(function (m, i) { return (React.createElement("div", { key: "".concat(m.tag, "-").concat(i), style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', marginBottom: '8px' } },
                                    React.createElement("span", { style: { fontWeight: 700, color: '#1e293b' } },
                                        m.tag || 'Sem TAG',
                                        m.hostname ? " \u2014 ".concat(m.hostname) : '',
                                        m.departamento ? " (".concat(m.departamento, ")") : ''),
                                    loteMaquinas.length > 1 && (React.createElement("button", { onClick: function () { return removeLoteMaquina(i); }, style: __assign(__assign({}, S.iconBtn), { color: '#ef4444' }), title: "Remover" }, "\uD83D\uDDD1")))); })),
                            React.createElement("div", { style: { textAlign: 'center', padding: '4px 0', color: '#94a3b8', fontSize: '20px' } }, "\u2193"),
                            React.createElement("div", { style: { background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem' } },
                                React.createElement("p", { style: { fontSize: '12px', fontWeight: 700, color: '#14532d', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' } }, "\uD83D\uDCBB 2. M\u00E1quina que entrar\u00E1 no lugar (Nova)"),
                                React.createElement("div", { style: S.group },
                                    React.createElement("label", { style: S.label },
                                        "AnyDesk da M\u00E1quina Nova ",
                                        React.createElement("span", { style: { color: '#94a3b8', fontWeight: 400 } }, "(Opcional)")),
                                    React.createElement("input", { style: S.input, type: "text", placeholder: "Ex: 123 456 789", value: loteNewMachine.newAnyDesk, onChange: function (e) { return updateLoteNew('newAnyDesk', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }),
                                    React.createElement("span", { style: S.helpText },
                                        React.createElement("a", { href: "https://anydesk.com/pt/downloads", target: "_blank", rel: "noopener noreferrer", style: { color: theme.primary } }, "Baixar AnyDesk \u2192"))),
                                React.createElement("div", { style: { background: '#fff', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem', marginBottom: '10px' } },
                                    React.createElement("label", { style: __assign(__assign({}, S.label), { marginBottom: '10px' }) },
                                        "A m\u00E1quina nova ser\u00E1 destinada ao mesmo colaborador? ",
                                        React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                    React.createElement("div", { style: { display: 'flex', gap: '10px' } },
                                        React.createElement("button", { style: S.toggleBtn(loteNewMachine.sameUser), onClick: function () { return updateLoteNew('sameUser', true); } }, "Sim, mesmo usu\u00E1rio"),
                                        React.createElement("button", { style: S.toggleBtn(!loteNewMachine.sameUser, '#d97706'), onClick: function () { return updateLoteNew('sameUser', false); } }, "N\u00E3o, outro usu\u00E1rio")),
                                    !loteNewMachine.sameUser && (React.createElement("div", { style: { marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' } },
                                        React.createElement("div", { style: S.grid3 },
                                            React.createElement("div", null,
                                                React.createElement("label", { style: S.label },
                                                    "Nome Completo ",
                                                    React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                                React.createElement("input", { style: S.input, type: "text", value: loteNewMachine.newUser.name, onChange: function (e) { return updateLoteNewUser('name', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                                            React.createElement("div", null,
                                                React.createElement("label", { style: S.label },
                                                    "Novo E-mail ",
                                                    React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                                React.createElement("input", { style: __assign(__assign({}, S.input), { borderColor: showError && loteNewMachine.newUser.email.trim() && !isValidEmail(loteNewMachine.newUser.email) ? '#ef4444' : undefined }), type: "email", value: loteNewMachine.newUser.email, onChange: function (e) { return updateLoteNewUser('email', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }),
                                                showError && loteNewMachine.newUser.email.trim() && !isValidEmail(loteNewMachine.newUser.email) && (React.createElement("span", { style: { fontSize: '12px', color: '#ef4444', marginTop: '4px', display: 'block' } }, "E-mail inv\u00E1lido."))),
                                            React.createElement("div", null,
                                                React.createElement("label", { style: S.label },
                                                    "Novo Departamento ",
                                                    React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                                React.createElement("input", { style: S.input, type: "text", value: loteNewMachine.newUser.department, onChange: function (e) { return updateLoteNewUser('department', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })))))),
                                React.createElement("div", { style: { background: '#fff', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem' } },
                                    React.createElement("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: loteNewMachine.needsTransfer ? '12px' : '0' } },
                                        React.createElement("div", null,
                                            React.createElement("span", { style: { fontSize: '14px', fontWeight: 600, color: '#374151' } }, "Necessita transferir dados das antigas?"),
                                            React.createElement("span", { style: { display: 'block', fontSize: '12px', color: '#94a3b8' } }, "Arquivos, configura\u00E7\u00F5es, favoritos, etc.")),
                                        React.createElement("label", { style: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: loteNewMachine.needsTransfer ? theme.primary : '#64748b' } },
                                            React.createElement("input", { type: "checkbox", checked: loteNewMachine.needsTransfer, onChange: function (e) { return updateLoteNew('needsTransfer', e.target.checked); }, style: { accentColor: theme.primary, width: '16px', height: '16px' } }),
                                            loteNewMachine.needsTransfer ? 'Sim' : 'Não')),
                                    loteNewMachine.needsTransfer && (React.createElement("div", { style: { paddingTop: '12px', borderTop: '1px solid #e2e8f0' } },
                                        React.createElement("div", { style: S.grid2 },
                                            React.createElement("div", null,
                                                React.createElement("label", { style: S.label }, "Pastas / Arquivos espec\u00EDficos"),
                                                React.createElement("textarea", { style: __assign(__assign({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Ex: C:\\Sistemas, Meus Documentos...", value: loteNewMachine.transferDetails.files, onChange: function (e) { return updateLoteTransfer('files', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                                            React.createElement("div", null,
                                                React.createElement("label", { style: S.label }, "Softwares / Configura\u00E7\u00F5es"),
                                                React.createElement("textarea", { style: __assign(__assign({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Ex: Certificados, Favoritos Chrome...", value: loteNewMachine.transferDetails.programs, onChange: function (e) { return updateLoteTransfer('programs', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }))))))))) : (React.createElement(React.Fragment, null,
                            formData.replacements.map(function (rep, i) { return (React.createElement("div", { key: i, style: S.itemCard },
                                React.createElement("div", { style: S.itemCardHeader },
                                    React.createElement("span", null,
                                        "\uD83D\uDD04 Troca de Equipamento ",
                                        i + 1),
                                    formData.replacements.length > 1 && (React.createElement("button", { onClick: function () { return removeReplacement(i); }, style: __assign(__assign({}, S.iconBtn), { color: '#ef4444' }) }, "\uD83D\uDDD1"))),
                                React.createElement("div", { style: S.itemCardBody },
                                    React.createElement("div", { style: { background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', marginBottom: '8px' } },
                                        React.createElement("p", { style: { fontSize: '12px', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' } }, "\uD83D\uDDA5 1. M\u00E1quina que ser\u00E1 retirada (Antiga)"),
                                        React.createElement("div", { style: S.grid3 },
                                            React.createElement("div", null,
                                                React.createElement("label", { style: S.label },
                                                    "TAG / Patrim\u00F4nio ",
                                                    React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                                React.createElement("input", { style: S.input, type: "text", placeholder: "Ex: PC-05", value: rep.oldTag, onChange: function (e) { return updateRep(i, 'oldTag', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                                            React.createElement("div", null,
                                                React.createElement("label", { style: S.label },
                                                    "E-mail do usu\u00E1rio ",
                                                    React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                                React.createElement("input", { style: __assign(__assign({}, S.input), { borderColor: showError && rep.oldEmail.trim() && !isValidEmail(rep.oldEmail) ? '#ef4444' : undefined }), type: "email", placeholder: "usuario@empresa.com", value: rep.oldEmail, onChange: function (e) { return updateRep(i, 'oldEmail', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }),
                                                showError && rep.oldEmail.trim() && !isValidEmail(rep.oldEmail) && (React.createElement("span", { style: { fontSize: '12px', color: '#ef4444', marginTop: '4px', display: 'block' } }, "E-mail inv\u00E1lido."))),
                                            React.createElement("div", null,
                                                React.createElement("label", { style: S.label },
                                                    "Departamento ",
                                                    React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                                React.createElement("input", { style: S.input, type: "text", placeholder: "Ex: Financeiro", value: rep.oldDepartment, onChange: function (e) { return updateRep(i, 'oldDepartment', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })))),
                                    React.createElement("div", { style: { textAlign: 'center', padding: '4px 0', color: '#94a3b8', fontSize: '20px' } }, "\u2193"),
                                    React.createElement("div", { style: { background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem' } },
                                        React.createElement("p", { style: { fontSize: '12px', fontWeight: 700, color: '#14532d', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' } }, "\uD83D\uDCBB 2. M\u00E1quina que entrar\u00E1 no lugar (Nova)"),
                                        React.createElement("div", { style: S.group },
                                            React.createElement("label", { style: S.label },
                                                "AnyDesk da M\u00E1quina Nova ",
                                                React.createElement("span", { style: { color: '#94a3b8', fontWeight: 400 } }, "(Opcional)")),
                                            React.createElement("input", { style: S.input, type: "text", placeholder: "Ex: 123 456 789", value: rep.newAnyDesk, onChange: function (e) { return updateRep(i, 'newAnyDesk', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }),
                                            React.createElement("span", { style: S.helpText },
                                                React.createElement("a", { href: "https://anydesk.com/pt/downloads", target: "_blank", rel: "noopener noreferrer", style: { color: theme.primary } }, "Baixar AnyDesk \u2192"))),
                                        React.createElement("div", { style: { background: '#fff', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem', marginBottom: '10px' } },
                                            React.createElement("label", { style: __assign(__assign({}, S.label), { marginBottom: '10px' }) },
                                                "A m\u00E1quina nova ser\u00E1 destinada ao mesmo colaborador? ",
                                                React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                            React.createElement("div", { style: { display: 'flex', gap: '10px' } },
                                                React.createElement("button", { style: S.toggleBtn(rep.sameUser), onClick: function () { return updateRep(i, 'sameUser', true); } }, "Sim, mesmo usu\u00E1rio"),
                                                React.createElement("button", { style: S.toggleBtn(!rep.sameUser, '#d97706'), onClick: function () { return updateRep(i, 'sameUser', false); } }, "N\u00E3o, outro usu\u00E1rio")),
                                            !rep.sameUser && (React.createElement("div", { style: { marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' } },
                                                React.createElement("div", { style: S.grid3 },
                                                    React.createElement("div", null,
                                                        React.createElement("label", { style: S.label },
                                                            "Nome Completo ",
                                                            React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                                        React.createElement("input", { style: S.input, type: "text", value: rep.newUser.name, onChange: function (e) { return updateNewUser(i, 'name', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                                                    React.createElement("div", null,
                                                        React.createElement("label", { style: S.label },
                                                            "Novo E-mail ",
                                                            React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                                        React.createElement("input", { style: __assign(__assign({}, S.input), { borderColor: showError && rep.newUser.email.trim() && !isValidEmail(rep.newUser.email) ? '#ef4444' : undefined }), type: "email", value: rep.newUser.email, onChange: function (e) { return updateNewUser(i, 'email', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }),
                                                        showError && rep.newUser.email.trim() && !isValidEmail(rep.newUser.email) && (React.createElement("span", { style: { fontSize: '12px', color: '#ef4444', marginTop: '4px', display: 'block' } }, "E-mail inv\u00E1lido."))),
                                                    React.createElement("div", null,
                                                        React.createElement("label", { style: S.label },
                                                            "Novo Departamento ",
                                                            React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                                        React.createElement("input", { style: S.input, type: "text", value: rep.newUser.department, onChange: function (e) { return updateNewUser(i, 'department', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })))))),
                                        React.createElement("div", { style: { background: '#fff', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem' } },
                                            React.createElement("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: rep.needsTransfer ? '12px' : '0' } },
                                                React.createElement("div", null,
                                                    React.createElement("span", { style: { fontSize: '14px', fontWeight: 600, color: '#374151' } }, "Necessita transferir dados da antiga?"),
                                                    React.createElement("span", { style: { display: 'block', fontSize: '12px', color: '#94a3b8' } }, "Arquivos, configura\u00E7\u00F5es, favoritos, etc.")),
                                                React.createElement("label", { style: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: rep.needsTransfer ? theme.primary : '#64748b' } },
                                                    React.createElement("input", { type: "checkbox", checked: rep.needsTransfer, onChange: function (e) { return updateRep(i, 'needsTransfer', e.target.checked); }, style: { accentColor: theme.primary, width: '16px', height: '16px' } }),
                                                    rep.needsTransfer ? 'Sim' : 'Não')),
                                            rep.needsTransfer && (React.createElement("div", { style: { paddingTop: '12px', borderTop: '1px solid #e2e8f0' } },
                                                React.createElement("div", { style: S.grid2 },
                                                    React.createElement("div", null,
                                                        React.createElement("label", { style: S.label }, "Pastas / Arquivos espec\u00EDficos"),
                                                        React.createElement("textarea", { style: __assign(__assign({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Ex: C:\\Sistemas, Meus Documentos...", value: rep.transferDetails.files, onChange: function (e) { return updateTransfer(i, 'files', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                                                    React.createElement("div", null,
                                                        React.createElement("label", { style: S.label }, "Softwares / Configura\u00E7\u00F5es"),
                                                        React.createElement("textarea", { style: __assign(__assign({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Ex: Certificados, Favoritos Chrome...", value: rep.transferDetails.programs, onChange: function (e) { return updateTransfer(i, 'programs', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })))))))))); }),
                            React.createElement("button", { style: S.btnAddMore, onClick: addReplacement }, "\uFF0B Adicionar outra substitui\u00E7\u00E3o"))))),
                    step === 4 && (React.createElement("div", null,
                        React.createElement("div", { style: { textAlign: 'center', marginBottom: '2rem' } },
                            React.createElement("div", { style: { width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 12px' } }, "\u2713"),
                            React.createElement("p", { style: __assign(__assign({}, S.sectionTitle), { textAlign: 'center' }) }, "Pronto para Solicitar Substitui\u00E7\u00E3o!"),
                            React.createElement("span", { style: { fontSize: '13px', color: '#94a3b8' } }, "Revise o resumo das trocas antes de enviar.")),
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
                            isLote
                                ? loteMaquinas.map(function (m, i) { return (React.createElement("div", { key: "".concat(m.tag, "-").concat(i), style: { padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '24px', alignItems: 'center' } },
                                    React.createElement("div", { style: { flex: 1 } },
                                        React.createElement("span", { style: __assign(__assign({}, S.reviewLabel), { color: '#dc2626' }) }, "Sai"),
                                        React.createElement("div", { style: { fontWeight: 700, color: '#1e293b' } }, m.tag || 'Sem TAG'),
                                        React.createElement("div", { style: { fontSize: '12px', color: '#94a3b8' } }, m.hostname)),
                                    React.createElement("div", { style: { color: '#94a3b8', fontSize: '20px' } }, "\u2192"),
                                    React.createElement("div", { style: { flex: 1 } },
                                        React.createElement("span", { style: __assign(__assign({}, S.reviewLabel), { color: '#16a34a' }) }, "Entra"),
                                        React.createElement("div", { style: { fontWeight: 700, color: '#1e293b' } }, loteNewMachine.sameUser ? 'Mesmo Usuário' : loteNewMachine.newUser.name),
                                        React.createElement("div", { style: { fontSize: '12px', color: '#94a3b8' } },
                                            "Transf. Dados: ",
                                            loteNewMachine.needsTransfer ? 'Sim' : 'Não')))); })
                                : formData.replacements.map(function (rep, i) { return (React.createElement("div", { key: i, style: { padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '24px', alignItems: 'center' } },
                                    React.createElement("div", { style: { flex: 1 } },
                                        React.createElement("span", { style: __assign(__assign({}, S.reviewLabel), { color: '#dc2626' }) }, "Sai"),
                                        React.createElement("div", { style: { fontWeight: 700, color: '#1e293b' } }, rep.oldTag || 'Sem TAG'),
                                        React.createElement("div", { style: { fontSize: '12px', color: '#94a3b8' } }, rep.oldEmail)),
                                    React.createElement("div", { style: { color: '#94a3b8', fontSize: '20px' } }, "\u2192"),
                                    React.createElement("div", { style: { flex: 1 } },
                                        React.createElement("span", { style: __assign(__assign({}, S.reviewLabel), { color: '#16a34a' }) }, "Entra"),
                                        React.createElement("div", { style: { fontWeight: 700, color: '#1e293b' } }, rep.sameUser ? 'Mesmo Usuário' : rep.newUser.name),
                                        React.createElement("div", { style: { fontSize: '12px', color: '#94a3b8' } },
                                            "Transf. Dados: ",
                                            rep.needsTransfer ? 'Sim' : 'Não')))); })))),
                    submitStatus === 'error' && (React.createElement("div", { style: S.errorBanner }, "\u26A0 Erro ao enviar. Tente novamente ou entre em contato com o suporte.")),
                    showError && step !== 1 && (React.createElement("div", { style: S.errorBanner }, "\u26A0 Por favor, preencha todos os campos obrigat\u00F3rios (*) antes de avan\u00E7ar."))),
                React.createElement("div", { style: S.cardFooter },
                    step > 1 ? React.createElement("button", { style: S.btnPrev, onClick: prev }, "\u2190 Voltar") : React.createElement("div", null),
                    step < totalSteps ? (React.createElement("button", { style: S.btnNext, onClick: next }, "Pr\u00F3ximo \u2192")) : (submitStatus === 'success' ? (React.createElement("button", { style: __assign(__assign({}, S.btnSubmit), { background: '#16a34a', cursor: 'default' }), disabled: true }, "\u2713 Enviado com sucesso!")) : (React.createElement("button", { style: __assign(__assign({}, S.btnSubmit), { opacity: submitting ? 0.7 : 1 }), onClick: handleSubmit, disabled: submitting }, submitting ? 'Enviando...' : 'Enviar Solicitação'))))),
            React.createElement("div", { style: S.helpFooter },
                React.createElement("p", { style: { marginBottom: '6px', fontWeight: 500, color: '#64748b' } }, "N\u00E3o tem certeza se quer adicionar nova ou substituir?"),
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
//# sourceMappingURL=FormSubstituicao.js.map