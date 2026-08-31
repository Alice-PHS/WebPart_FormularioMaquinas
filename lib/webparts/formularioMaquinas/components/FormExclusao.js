import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
import * as React from 'react';
import { useState } from 'react';
import { makeStyles, themes } from './formStyles';
var FLOW_URL = 'https://defaulte8fc68b65d194bf4a2c1a5ed5dc4c2.f5.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/ee360285171e4f5f8091be3cd4e5c204/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Gj4na39slMDwQmm-UCzvgS9GX0-ODgN9DV0mMcaX1Wk';
export default function FormExclusao(_a) {
    var _this = this;
    var numeroChamado = _a.numeroChamado, nomeEmpresa = _a.nomeEmpresa, solicitanteEmail = _a.solicitanteEmail, tag = _a.tag, hostname = _a.hostname, equCodigo = _a.equCodigo, maquinas = _a.maquinas;
    var theme = themes.exclusao;
    var S = makeStyles(theme);
    var _b = useState(1), step = _b[0], setStep = _b[1];
    var totalSteps = 4;
    var _c = useState(false), showError = _c[0], setShowError = _c[1];
    var _d = useState(false), submitting = _d[0], setSubmitting = _d[1];
    var _e = useState('idle'), submitStatus = _e[0], setSubmitStatus = _e[1];
    // NOVO ESTADO: Controle de exibição do pop-up de discordância
    var _f = useState(false), showDisagreePopup = _f[0], setShowDisagreePopup = _f[1];
    // LOTE: 2+ máquinas vieram selecionadas na tabela do PAG
    var isLote = !!maquinas && maquinas.length >= 2;
    var maquinaPreSelecionada = !isLote && !!(tag || hostname || equCodigo);
    var _g = useState(isLote ? maquinas : []), loteMaquinas = _g[0], setLoteMaquinas = _g[1];
    var _h = useState({
        agreed: null,
        requesterName: '',
        companyName: nomeEmpresa || '',
        ticketNumber: numeroChamado || '',
        exclusions: [{ tag: tag || '', additionalInfo: '', hostname: hostname || '', equCodigo: equCodigo || '' }],
    }), formData = _h[0], setFormData = _h[1];
    var removeLoteMaquina = function (i) {
        if (loteMaquinas.length === 1)
            return;
        setLoteMaquinas(function (prev) { return prev.filter(function (_, idx) { return idx !== i; }); });
    };
    var update = function (field, value) {
        setFormData(function (p) {
            var _a;
            return (__assign(__assign({}, p), (_a = {}, _a[field] = value, _a)));
        });
        if (showError)
            setShowError(false);
    };
    var updateExclusion = function (i, field, value) {
        var _a;
        var arr = __spreadArray([], formData.exclusions, true);
        arr[i] = __assign(__assign({}, arr[i]), (_a = {}, _a[field] = value, _a));
        setFormData(function (p) { return (__assign(__assign({}, p), { exclusions: arr })); });
        if (showError)
            setShowError(false);
    };
    var addExclusion = function () { return setFormData(function (p) { return (__assign(__assign({}, p), { exclusions: __spreadArray(__spreadArray([], p.exclusions, true), [{ tag: '', additionalInfo: '' }], false) })); }); };
    var removeExclusion = function (i) {
        if (formData.exclusions.length === 1)
            return;
        setFormData(function (p) { return (__assign(__assign({}, p), { exclusions: p.exclusions.filter(function (_, idx) { return idx !== i; }) })); });
    };
    var validate = function (s) {
        if (s === 1)
            return formData.agreed === true;
        if (s === 2)
            return formData.requesterName.trim();
        if (s === 3)
            return isLote ? loteMaquinas.length > 0 : formData.exclusions.every(function (e) { return e.tag.trim(); });
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
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var maquinasPayload, payload, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    maquinasPayload = isLote
                        ? loteMaquinas.map(function (m) { return ({ tag: m.tag, observacoes: '', hostname: m.hostname || '', equCodigo: m.equCodigo !== null ? String(m.equCodigo) : '' }); })
                        : formData.exclusions.map(function (e) { return ({ tag: e.tag, observacoes: e.additionalInfo, hostname: e.hostname || '', equCodigo: e.equCodigo || '' }); });
                    payload = {
                        tipoFormulario: 'exclusao',
                        solicitante: formData.requesterName,
                        solicitanteEmail: solicitanteEmail,
                        empresa: formData.companyName,
                        numeroChamado: formData.ticketNumber,
                        maquinas: maquinasPayload,
                        resumoMaquinas: maquinasPayload.map(function (m) { return "TAG: ".concat(m.tag, " / Host: ").concat(m.hostname); }).join('; '),
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
                    React.createElement("p", { style: S.brandSub }, "Exclus\u00E3o de Equipamentos")),
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
                                React.createElement("p", { style: S.alertTitle }, "Termo de Exclus\u00E3o de M\u00E1quinas"),
                                React.createElement("p", { style: S.alertText }, "A exclus\u00E3o de m\u00E1quinas do gerenciamento deve atender a alguns par\u00E2metros previstos em contrato:"),
                                React.createElement("ul", { style: __assign(__assign({}, S.alertText), { paddingLeft: '1.25rem', marginTop: '8px' }) },
                                    React.createElement("li", { style: { marginBottom: '6px' } },
                                        React.createElement("strong", null, "N\u00E3o ultrapassar o limite m\u00EDnimo:"),
                                        " O valor pago baseia-se no n\u00FAmero de m\u00E1quinas. H\u00E1 um n\u00FAmero m\u00EDnimo que ser\u00E1 avaliado pelo departamento financeiro."),
                                    React.createElement("li", null,
                                        React.createElement("strong", null, "Car\u00EAncia m\u00EDnima:"),
                                        " A m\u00E1quina n\u00E3o pode ter sido inclu\u00EDda no contrato h\u00E1 menos de ",
                                        React.createElement("strong", null, "06 (seis) meses"),
                                        ".")))),
                        React.createElement("div", { style: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' } },
                            React.createElement("label", { style: __assign(__assign({}, S.label), { marginBottom: '1rem' }) },
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
                        React.createElement("span", { style: S.sectionSub }, "Informe os dados do Sponsor ou pessoa autorizada para esta exclus\u00E3o."),
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
                        React.createElement("p", { style: S.sectionTitle }, "M\u00E1quinas para Exclus\u00E3o"),
                        React.createElement("span", { style: S.sectionSub }, "Indique as TAGs das m\u00E1quinas que dever\u00E3o ser retiradas do contrato."),
                        maquinaPreSelecionada && (React.createElement("div", { style: { background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', margin: '12px 0', fontSize: '13px', color: '#991b1b' } }, "\u2139 Identifica\u00E7\u00E3o pr\u00E9-preenchida a partir da m\u00E1quina selecionada. Voc\u00EA pode editar se necess\u00E1rio.")),
                        isLote ? (React.createElement(React.Fragment, null,
                            React.createElement("div", { style: { background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', margin: '12px 0', fontSize: '13px', color: '#991b1b' } },
                                "\u2139 ",
                                loteMaquinas.length,
                                " m\u00E1quinas selecionadas para exclus\u00E3o. Remova alguma da lista se necess\u00E1rio."),
                            loteMaquinas.map(function (m, i) { return (React.createElement("div", { key: "".concat(m.tag, "-").concat(i), style: __assign(__assign({}, S.itemCard), { borderColor: '#fecaca' }) },
                                React.createElement("div", { style: __assign(__assign({}, S.itemCardHeader), { background: '#fef2f2', color: '#991b1b' }) },
                                    React.createElement("span", null,
                                        "\uD83D\uDDA5 ",
                                        m.tag || 'Sem TAG',
                                        m.hostname ? " \u2014 ".concat(m.hostname) : '',
                                        m.departamento ? " (".concat(m.departamento, ")") : ''),
                                    loteMaquinas.length > 1 && (React.createElement("button", { onClick: function () { return removeLoteMaquina(i); }, style: __assign(__assign({}, S.iconBtn), { color: '#ef4444' }), title: "Remover" }, "\uD83D\uDDD1"))))); }))) : (React.createElement(React.Fragment, null,
                            formData.exclusions.map(function (exc, i) { return (React.createElement("div", { key: i, style: __assign(__assign({}, S.itemCard), { borderColor: '#fecaca' }) },
                                React.createElement("div", { style: __assign(__assign({}, S.itemCardHeader), { background: '#fef2f2', color: '#991b1b' }) },
                                    React.createElement("span", null,
                                        "\uD83D\uDDA5 Equipamento ",
                                        i + 1),
                                    formData.exclusions.length > 1 && (React.createElement("button", { onClick: function () { return removeExclusion(i); }, style: __assign(__assign({}, S.iconBtn), { color: '#ef4444' }), title: "Remover" }, "\uD83D\uDDD1"))),
                                React.createElement("div", { style: S.itemCardBody },
                                    React.createElement("div", { style: S.grid2 },
                                        React.createElement("div", null,
                                            React.createElement("label", { style: S.label },
                                                "TAG / Patrim\u00F4nio ",
                                                React.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                            React.createElement("input", { style: S.input, type: "text", placeholder: "Ex: PC-05, LPT-10", value: exc.tag, onChange: function (e) { return updateExclusion(i, 'tag', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                                        React.createElement("div", null,
                                            React.createElement("label", { style: S.label },
                                                "Observa\u00E7\u00F5es ",
                                                React.createElement("span", { style: { color: '#94a3b8', fontWeight: 400 } }, "(Opcional)")),
                                            React.createElement("input", { style: S.input, type: "text", placeholder: "Usu\u00E1rio anterior, departamento...", value: exc.additionalInfo, onChange: function (e) { return updateExclusion(i, 'additionalInfo', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })))))); }),
                            React.createElement("button", { style: __assign(__assign({}, S.btnAddMore), { borderColor: '#fca5a5', color: '#b91c1c' }), onClick: addExclusion }, "\uFF0B Adicionar outra m\u00E1quina para exclus\u00E3o"))))),
                    step === 4 && (React.createElement("div", null,
                        React.createElement("div", { style: { textAlign: 'center', marginBottom: '2rem' } },
                            React.createElement("div", { style: { width: '64px', height: '64px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#dc2626', margin: '0 auto 12px' } }, "\u2713"),
                            React.createElement("p", { style: __assign(__assign({}, S.sectionTitle), { textAlign: 'center' }) }, "Pronto para Solicitar Exclus\u00E3o!"),
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
                            React.createElement("div", { style: { background: '#fef2f2', padding: '10px 16px', borderBottom: '1px solid #fecaca' } },
                                React.createElement("span", { style: __assign(__assign({}, S.reviewLabel), { color: '#991b1b' }) },
                                    "Total de m\u00E1quinas a excluir: ",
                                    isLote ? loteMaquinas.length : formData.exclusions.length)),
                            (isLote ? loteMaquinas : formData.exclusions).map(function (exc, i) { return (React.createElement("div", { key: i, style: { padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
                                React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
                                    React.createElement("div", { style: { width: '36px', height: '36px', background: '#fee2e2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' } }, "\uD83D\uDDA5"),
                                    React.createElement("div", null,
                                        React.createElement("div", { style: { fontWeight: 700, color: '#1e293b' } }, exc.tag),
                                        isLote
                                            ? (exc.hostname && React.createElement("div", { style: { fontSize: '12px', color: '#94a3b8' } }, exc.hostname))
                                            : (exc.additionalInfo && React.createElement("div", { style: { fontSize: '12px', color: '#94a3b8' } }, exc.additionalInfo)))),
                                React.createElement("span", { style: { fontSize: '11px', fontWeight: 700, color: '#dc2626', background: '#fee2e2', padding: '3px 10px', borderRadius: '999px' } }, "A Excluir"))); })))),
                    submitStatus === 'error' && (React.createElement("div", { style: S.errorBanner }, "\u26A0 Erro ao enviar. Tente novamente ou entre em contato com o suporte.")),
                    showError && step !== 1 && (React.createElement("div", { style: S.errorBanner }, "\u26A0 Por favor, preencha todos os campos obrigat\u00F3rios (*) antes de avan\u00E7ar."))),
                React.createElement("div", { style: S.cardFooter },
                    step > 1 ? React.createElement("button", { style: S.btnPrev, onClick: prev }, "\u2190 Voltar") : React.createElement("div", null),
                    step < totalSteps ? (React.createElement("button", { style: S.btnNext, onClick: next }, "Pr\u00F3ximo \u2192")) : (submitStatus === 'success' ? (React.createElement("button", { style: __assign(__assign({}, S.btnSubmit), { background: '#16a34a', cursor: 'default' }), disabled: true }, "\u2713 Enviado com sucesso!")) : (React.createElement("button", { style: __assign(__assign({}, S.btnSubmit), { background: '#dc2626', boxShadow: '0 2px 8px #dc262655', opacity: submitting ? 0.7 : 1 }), onClick: handleSubmit, disabled: submitting }, submitting ? 'Enviando...' : 'Enviar Solicitação'))))),
            React.createElement("div", { style: S.helpFooter },
                React.createElement("p", { style: { marginBottom: '6px', fontWeight: 500, color: '#64748b' } }, "N\u00E3o tem certeza se o equipamento deve ser exclu\u00EDdo?"),
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
//# sourceMappingURL=FormExclusao.js.map