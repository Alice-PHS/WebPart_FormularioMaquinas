(()=>{ var __RUSHSTACK_CURRENT_SCRIPT__ = document.currentScript; define("a6b61804-85fc-43d3-8837-8a99fb111bda_0.0.1", ["react","react-dom","@microsoft/sp-core-library","@microsoft/sp-property-pane","@microsoft/sp-webpart-base","FormularioMaquinasWebPartStrings","@microsoft/sp-http"], (__WEBPACK_EXTERNAL_MODULE__959__, __WEBPACK_EXTERNAL_MODULE__398__, __WEBPACK_EXTERNAL_MODULE__676__, __WEBPACK_EXTERNAL_MODULE__877__, __WEBPACK_EXTERNAL_MODULE__642__, __WEBPACK_EXTERNAL_MODULE__800__, __WEBPACK_EXTERNAL_MODULE__909__) => { return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 863:
/*!**********************************************************************!*\
  !*** ./lib/webparts/formularioMaquinas/FormularioMaquinasWebPart.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ 398);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-core-library */ 676);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @microsoft/sp-property-pane */ 877);
/* harmony import */ var _microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/sp-webpart-base */ 642);
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var FormularioMaquinasWebPartStrings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! FormularioMaquinasWebPartStrings */ 800);
/* harmony import */ var FormularioMaquinasWebPartStrings__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(FormularioMaquinasWebPartStrings__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_FormularioMaquinas__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/FormularioMaquinas */ 399);








var FormularioMaquinasWebPart = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__extends)(FormularioMaquinasWebPart, _super);
    function FormularioMaquinasWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isDarkTheme = false;
        _this._environmentMessage = '';
        return _this;
    }
    FormularioMaquinasWebPart.prototype.render = function () {
        var element = react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_FormularioMaquinas__WEBPACK_IMPORTED_MODULE_6__["default"], {
            description: this.properties.description,
            isDarkTheme: this._isDarkTheme,
            environmentMessage: this._environmentMessage,
            hasTeamsContext: !!this.context.sdks.microsoftTeams,
            userDisplayName: this.context.pageContext.user.displayName,
            userEmail: this.context.pageContext.user.email,
            context: this.context
        });
        react_dom__WEBPACK_IMPORTED_MODULE_1__.render(element, this.domElement);
    };
    FormularioMaquinasWebPart.prototype.onInit = function () {
        var _this = this;
        return this._getEnvironmentMessage().then(function (message) {
            _this._environmentMessage = message;
        });
    };
    FormularioMaquinasWebPart.prototype._getEnvironmentMessage = function () {
        var _this = this;
        if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
            return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
                .then(function (context) {
                var environmentMessage = '';
                switch (context.app.host.name) {
                    case 'Office': // running in Office
                        environmentMessage = _this.context.isServedFromLocalhost ? FormularioMaquinasWebPartStrings__WEBPACK_IMPORTED_MODULE_5__.AppLocalEnvironmentOffice : FormularioMaquinasWebPartStrings__WEBPACK_IMPORTED_MODULE_5__.AppOfficeEnvironment;
                        break;
                    case 'Outlook': // running in Outlook
                        environmentMessage = _this.context.isServedFromLocalhost ? FormularioMaquinasWebPartStrings__WEBPACK_IMPORTED_MODULE_5__.AppLocalEnvironmentOutlook : FormularioMaquinasWebPartStrings__WEBPACK_IMPORTED_MODULE_5__.AppOutlookEnvironment;
                        break;
                    case 'Teams': // running in Teams
                    case 'TeamsModern':
                        environmentMessage = _this.context.isServedFromLocalhost ? FormularioMaquinasWebPartStrings__WEBPACK_IMPORTED_MODULE_5__.AppLocalEnvironmentTeams : FormularioMaquinasWebPartStrings__WEBPACK_IMPORTED_MODULE_5__.AppTeamsTabEnvironment;
                        break;
                    default:
                        environmentMessage = FormularioMaquinasWebPartStrings__WEBPACK_IMPORTED_MODULE_5__.UnknownEnvironment;
                }
                return environmentMessage;
            });
        }
        return Promise.resolve(this.context.isServedFromLocalhost ? FormularioMaquinasWebPartStrings__WEBPACK_IMPORTED_MODULE_5__.AppLocalEnvironmentSharePoint : FormularioMaquinasWebPartStrings__WEBPACK_IMPORTED_MODULE_5__.AppSharePointEnvironment);
    };
    FormularioMaquinasWebPart.prototype.onThemeChanged = function (currentTheme) {
        if (!currentTheme) {
            return;
        }
        this._isDarkTheme = !!currentTheme.isInverted;
        var semanticColors = currentTheme.semanticColors;
        if (semanticColors) {
            this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
            this.domElement.style.setProperty('--link', semanticColors.link || null);
            this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
        }
    };
    FormularioMaquinasWebPart.prototype.onDispose = function () {
        react_dom__WEBPACK_IMPORTED_MODULE_1__.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(FormularioMaquinasWebPart.prototype, "dataVersion", {
        get: function () {
            return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_2__.Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    FormularioMaquinasWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: FormularioMaquinasWebPartStrings__WEBPACK_IMPORTED_MODULE_5__.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: FormularioMaquinasWebPartStrings__WEBPACK_IMPORTED_MODULE_5__.BasicGroupName,
                            groupFields: [
                                (0,_microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_3__.PropertyPaneTextField)('description', {
                                    label: FormularioMaquinasWebPartStrings__WEBPACK_IMPORTED_MODULE_5__.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return FormularioMaquinasWebPart;
}(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_4__.BaseClientSideWebPart));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormularioMaquinasWebPart);


/***/ }),

/***/ 572:
/*!********************************************************************!*\
  !*** ./lib/webparts/formularioMaquinas/components/FormExclusao.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormExclusao)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _formStyles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formStyles */ 580);




var FLOW_URL = 'https://defaulte8fc68b65d194bf4a2c1a5ed5dc4c2.f5.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/ee360285171e4f5f8091be3cd4e5c204/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Gj4na39slMDwQmm-UCzvgS9GX0-ODgN9DV0mMcaX1Wk';
function FormExclusao(_a) {
    var _this = this;
    var numeroChamado = _a.numeroChamado, nomeEmpresa = _a.nomeEmpresa, solicitanteEmail = _a.solicitanteEmail;
    var theme = _formStyles__WEBPACK_IMPORTED_MODULE_1__.themes.exclusao;
    var S = (0,_formStyles__WEBPACK_IMPORTED_MODULE_1__.makeStyles)(theme);
    var _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1), step = _b[0], setStep = _b[1];
    var totalSteps = 4;
    var _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), showError = _c[0], setShowError = _c[1];
    var _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), submitting = _d[0], setSubmitting = _d[1];
    var _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('idle'), submitStatus = _e[0], setSubmitStatus = _e[1];
    // NOVO ESTADO: Controle de exibição do pop-up de discordância
    var _f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), showDisagreePopup = _f[0], setShowDisagreePopup = _f[1];
    var _g = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
        agreed: null,
        requesterName: '',
        companyName: nomeEmpresa || '',
        ticketNumber: numeroChamado || '',
        exclusions: [{ tag: '', additionalInfo: '' }],
    }), formData = _g[0], setFormData = _g[1];
    var update = function (field, value) {
        setFormData(function (p) {
            var _a;
            return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p), (_a = {}, _a[field] = value, _a)));
        });
        if (showError)
            setShowError(false);
    };
    var updateExclusion = function (i, field, value) {
        var _a;
        var arr = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)([], formData.exclusions, true);
        arr[i] = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, arr[i]), (_a = {}, _a[field] = value, _a));
        setFormData(function (p) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p), { exclusions: arr })); });
        if (showError)
            setShowError(false);
    };
    var addExclusion = function () { return setFormData(function (p) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p), { exclusions: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)([], p.exclusions, true), [{ tag: '', additionalInfo: '' }], false) })); }); };
    var removeExclusion = function (i) {
        if (formData.exclusions.length === 1)
            return;
        setFormData(function (p) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p), { exclusions: p.exclusions.filter(function (_, idx) { return idx !== i; }) })); });
    };
    var validate = function (s) {
        if (s === 1)
            return formData.agreed === true;
        if (s === 2)
            return formData.requesterName.trim();
        if (s === 3)
            return formData.exclusions.every(function (e) { return e.tag.trim(); });
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
    var handleSubmit = function () { return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(_this, void 0, void 0, function () {
        var payload, res, _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    payload = {
                        tipoFormulario: 'exclusao',
                        solicitante: formData.requesterName,
                        solicitanteEmail: solicitanteEmail,
                        empresa: formData.companyName,
                        numeroChamado: formData.ticketNumber,
                        maquinas: formData.exclusions.map(function (e) { return ({
                            tag: e.tag,
                            observacoes: e.additionalInfo,
                        }); }),
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
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.page },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.container },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.pageHeader },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.brandName }, "PHS Brasil"),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.brandSub }, "Exclus\u00E3o de Equipamentos")),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.stepBadge },
                    "Passo ",
                    step,
                    " de ",
                    totalSteps)),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.progressTrack },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { height: '100%', width: "".concat((step / totalSteps) * 100, "%"), background: theme.primary, borderRadius: '999px', transition: 'width 0.4s ease' } })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.card },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.cardBody },
                    step === 1 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.alertBox },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { fontSize: '22px', flexShrink: 0 } }, "\u26A0\uFE0F"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.alertTitle }, "Termo de Exclus\u00E3o de M\u00E1quinas"),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.alertText }, "A exclus\u00E3o de m\u00E1quinas do gerenciamento deve atender a alguns par\u00E2metros previstos em contrato:"),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.alertText), { paddingLeft: '1.25rem', marginTop: '8px' }) },
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", { style: { marginBottom: '6px' } },
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "N\u00E3o ultrapassar o limite m\u00EDnimo:"),
                                        " O valor pago baseia-se no n\u00FAmero de m\u00E1quinas. H\u00E1 um n\u00FAmero m\u00EDnimo que ser\u00E1 avaliado pelo departamento financeiro."),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "Car\u00EAncia m\u00EDnima:"),
                                        " A m\u00E1quina n\u00E3o pode ter sido inclu\u00EDda no contrato h\u00E1 menos de ",
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "06 (seis) meses"),
                                        ".")))),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' } },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.label), { marginBottom: '1rem' }) },
                                "Voc\u00EA leu o aviso acima e est\u00E1 ciente do prop\u00F3sito desta solicita\u00E7\u00E3o? ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.radioCard(formData.agreed === true) },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "radio", name: "agreed", checked: formData.agreed === true, onChange: function () { return update('agreed', true); }, style: { accentColor: theme.primary } }),
                                "Sim, li e estou de acordo."),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.radioCard(formData.agreed === false && formData.agreed !== null) },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "radio", name: "agreed", checked: formData.agreed === false, 
                                    // Só atualiza o estado agora, sem chamar o modal aqui
                                    onChange: function () { return update('agreed', false); } }),
                                "N\u00E3o li ou n\u00E3o estou de acordo.")))),
                    step === 2 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.sectionTitle }, "Qualifica\u00E7\u00E3o do Solicitante"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.sectionSub }, "Informe os dados do Sponsor ou pessoa autorizada para esta exclus\u00E3o."),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                "Seu nome ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Sponsor ou pessoa autorizada por ele", value: formData.requesterName, onChange: function (e) { return update('requesterName', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label }, "E-mail"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: solicitanteEmail, readOnly: true })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label }, "Nome da empresa"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: formData.companyName, readOnly: true })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label }, "N\u00FAmero do chamado"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: formData.ticketNumber, readOnly: true })))),
                    step === 3 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.sectionTitle }, "M\u00E1quinas para Exclus\u00E3o"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.sectionSub }, "Indique as TAGs das m\u00E1quinas que dever\u00E3o ser retiradas do contrato."),
                        formData.exclusions.map(function (exc, i) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { key: i, style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.itemCard), { borderColor: '#fecaca' }) },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.itemCardHeader), { background: '#fef2f2', color: '#991b1b' }) },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null,
                                    "\uD83D\uDDA5 Equipamento ",
                                    i + 1),
                                formData.exclusions.length > 1 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { onClick: function () { return removeExclusion(i); }, style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.iconBtn), { color: '#ef4444' }), title: "Remover" }, "\uD83D\uDDD1"))),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.itemCardBody },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.grid2 },
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                            "TAG / Patrim\u00F4nio ",
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Ex: PC-05, LPT-10", value: exc.tag, onChange: function (e) { return updateExclusion(i, 'tag', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                            "Observa\u00E7\u00F5es ",
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#94a3b8', fontWeight: 400 } }, "(Opcional)")),
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Usu\u00E1rio anterior, departamento...", value: exc.additionalInfo, onChange: function (e) { return updateExclusion(i, 'additionalInfo', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })))))); }),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.btnAddMore), { borderColor: '#fca5a5', color: '#b91c1c' }), onClick: addExclusion }, "\uFF0B Adicionar outra m\u00E1quina para exclus\u00E3o"))),
                    step === 4 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { textAlign: 'center', marginBottom: '2rem' } },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { width: '64px', height: '64px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#dc2626', margin: '0 auto 12px' } }, "\u2713"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.sectionTitle), { textAlign: 'center' }) }, "Pronto para Solicitar Exclus\u00E3o!"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { fontSize: '13px', color: '#94a3b8' } }, "Revise o resumo antes de enviar.")),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.reviewBox },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.reviewHeader },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "Solicitante"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewValue }, formData.requesterName)),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "Empresa"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewValue }, formData.companyName)),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "Chamado"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewValue },
                                        "#",
                                        formData.ticketNumber))),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { background: '#fef2f2', padding: '10px 16px', borderBottom: '1px solid #fecaca' } },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.reviewLabel), { color: '#991b1b' }) },
                                    "Total de m\u00E1quinas a excluir: ",
                                    formData.exclusions.length)),
                            formData.exclusions.map(function (exc, i) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { key: i, style: { padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { width: '36px', height: '36px', background: '#fee2e2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' } }, "\uD83D\uDDA5"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { fontWeight: 700, color: '#1e293b' } }, exc.tag),
                                        exc.additionalInfo && react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { fontSize: '12px', color: '#94a3b8' } }, exc.additionalInfo))),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { fontSize: '11px', fontWeight: 700, color: '#dc2626', background: '#fee2e2', padding: '3px 10px', borderRadius: '999px' } }, "A Excluir"))); })))),
                    submitStatus === 'error' && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.errorBanner }, "\u26A0 Erro ao enviar. Tente novamente ou entre em contato com o suporte.")),
                    showError && step !== 1 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.errorBanner }, "\u26A0 Por favor, preencha todos os campos obrigat\u00F3rios (*) antes de avan\u00E7ar."))),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.cardFooter },
                    step > 1 ? react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: S.btnPrev, onClick: prev }, "\u2190 Voltar") : react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null),
                    step < totalSteps ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: S.btnNext, onClick: next }, "Pr\u00F3ximo \u2192")) : (submitStatus === 'success' ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.btnSubmit), { background: '#16a34a', cursor: 'default' }), disabled: true }, "\u2713 Enviado com sucesso!")) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.btnSubmit), { background: '#dc2626', boxShadow: '0 2px 8px #dc262655', opacity: submitting ? 0.7 : 1 }), onClick: handleSubmit, disabled: submitting }, submitting ? 'Enviando...' : 'Enviar Solicitação'))))),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.helpFooter },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: { marginBottom: '6px', fontWeight: 500, color: '#64748b' } }, "N\u00E3o tem certeza se o equipamento deve ser exclu\u00EDdo?"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "https://wa.me/+551139451934", target: "_blank", rel: "noopener noreferrer", style: { color: '#16a34a', fontWeight: 500, marginRight: '16px' } }, "WhatsApp (11) 3945-1934"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "mailto:suporte@phsbrasil.com.br", style: { color: theme.primary, fontWeight: 500 } }, "suporte@phsbrasil.com.br"))),
        showDisagreePopup && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: {
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(3px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
            } },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: {
                    background: '#ffffff', borderRadius: '16px', padding: '2rem',
                    width: '90%', maxWidth: '450px', textAlign: 'center',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                } },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", { style: { fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '1rem' } }, "Aten\u00E7\u00E3o"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: { color: '#475569', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' } },
                    "Caro cliente,",
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null),
                    "Voc\u00EA poder\u00E1 nos consultar via atendimento para tratar quaisquer d\u00FAvidas referentes a este assunto."),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' } },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "mailto:sucessodocliente@phsbrasil.com.br", style: {
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            background: theme.primary, color: '#fff', textDecoration: 'none',
                            padding: '12px', borderRadius: '8px', fontWeight: 500, fontSize: '0.95rem'
                        } }, "\u2709\uFE0F sucessodocliente@phsbrasil.com.br"),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "https://wa.me/551139451934", target: "_blank", rel: "noopener noreferrer", style: {
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            background: '#16a34a', color: '#fff', textDecoration: 'none',
                            padding: '12px', borderRadius: '8px', fontWeight: 500, fontSize: '0.95rem'
                        } }, "\uD83D\uDCF1 WhatsApp: (11) 3945-1934")),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { onClick: function () { return setShowDisagreePopup(false); }, style: {
                        width: '100%', padding: '10px', background: '#f1f5f9', color: '#475569',
                        border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight: 600,
                        cursor: 'pointer', transition: 'background 0.2s'
                    } }, "Fechar"))))));
}


/***/ }),

/***/ 498:
/*!********************************************************************!*\
  !*** ./lib/webparts/formularioMaquinas/components/FormInclusao.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormInclusao)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _formStyles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formStyles */ 580);




var FLOW_URL = 'https://defaulte8fc68b65d194bf4a2c1a5ed5dc4c2.f5.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/ee360285171e4f5f8091be3cd4e5c204/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Gj4na39slMDwQmm-UCzvgS9GX0-ODgN9DV0mMcaX1Wk';
function FormInclusao(_a) {
    var _this = this;
    var numeroChamado = _a.numeroChamado, nomeEmpresa = _a.nomeEmpresa, solicitanteEmail = _a.solicitanteEmail;
    var theme = _formStyles__WEBPACK_IMPORTED_MODULE_1__.themes.inclusao;
    var S = (0,_formStyles__WEBPACK_IMPORTED_MODULE_1__.makeStyles)(theme);
    var _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1), step = _b[0], setStep = _b[1];
    var totalSteps = 6;
    var _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), showError = _c[0], setShowError = _c[1];
    var _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), submitting = _d[0], setSubmitting = _d[1];
    var _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('idle'), submitStatus = _e[0], setSubmitStatus = _e[1];
    // NOVO ESTADO: Controle de exibição do pop-up de discordância
    var _f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), showDisagreePopup = _f[0], setShowDisagreePopup = _f[1];
    var _g = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
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
            return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p), (_a = {}, _a[field] = value, _a)));
        });
        if (showError)
            setShowError(false);
    };
    var updateTransfer = function (field, value) {
        return setFormData(function (p) {
            var _a;
            return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p), { transferData: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p.transferData), (_a = {}, _a[field] = value, _a)) }));
        });
    };
    var updateUser = function (i, field, value) {
        var _a;
        var arr = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)([], formData.users, true);
        arr[i] = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, arr[i]), (_a = {}, _a[field] = value, _a));
        setFormData(function (p) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p), { users: arr })); });
    };
    var addUser = function () { return setFormData(function (p) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p), { users: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)([], p.users, true), [{ name: '', email: '', department: '' }], false) })); }); };
    var removeUser = function (i) {
        if (formData.users.length === 1)
            return;
        setFormData(function (p) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p), { users: p.users.filter(function (_, idx) { return idx !== i; }) })); });
    };
    var validate = function (s) {
        if (s === 1)
            return formData.agreed === true;
        if (s === 2)
            return formData.requesterName.trim();
        if (s === 3)
            return formData.users.every(function (u) { return u.name.trim() && u.email.trim() && u.department.trim(); });
        if (s === 4)
            return formData.folders.trim() && formData.programs.trim() && formData.printers.trim() && formData.referenceLogin.trim();
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
    var handleSubmit = function () { return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(_this, void 0, void 0, function () {
        var payload, res, _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__generator)(this, function (_b) {
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
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.page },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.container },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.pageHeader },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.brandName }, "PHS Brasil"),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.brandSub }, "Inclus\u00E3o em Gerenciamento")),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.stepBadge },
                    "Passo ",
                    step,
                    " de ",
                    totalSteps)),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.progressTrack },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { height: '100%', width: "".concat(progress, "%"), background: theme.primary, borderRadius: '999px', transition: 'width 0.4s ease' } })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.card },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.cardBody },
                    step === 1 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.alertBox },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { fontSize: '22px', flexShrink: 0 } }, "\u26A0\uFE0F"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.alertTitle }, "Aviso Importante"),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.alertText },
                                    "Ao preencher e enviar este formul\u00E1rio, voc\u00EA est\u00E1 solicitando \u00E0 equipe t\u00E9cnica da ",
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "PHS Brasil Consultoria em Inform\u00E1tica"),
                                    " que inclua as m\u00E1quinas descritas neste documento em seu contrato de gerenciamento cont\u00EDnuo.",
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "Aten\u00E7\u00E3o:"),
                                    " Isso poder\u00E1 acarretar em acr\u00E9scimos nos valores pagos atualmente, de acordo com as cl\u00E1usulas previstas em seu contrato."))),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' } },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.label), { marginBottom: '1rem' }) },
                                "Voc\u00EA leu o aviso acima e est\u00E1 ciente do prop\u00F3sito desta solicita\u00E7\u00E3o? ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.radioCard(formData.agreed === true) },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "radio", name: "agreed", checked: formData.agreed === true, onChange: function () { return update('agreed', true); }, style: { accentColor: theme.primary } }),
                                "Sim, li e estou de acordo."),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.radioCard(formData.agreed === false && formData.agreed !== null) },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "radio", name: "agreed", checked: formData.agreed === false, 
                                    // Só atualiza o estado agora, sem chamar o modal aqui
                                    onChange: function () { return update('agreed', false); } }),
                                "N\u00E3o li ou n\u00E3o estou de acordo.")),
                        showError && formData.agreed === false && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.errorBanner }, "\u26A0 Voc\u00EA precisa estar de acordo para prosseguir com a inclus\u00E3o.")))),
                    step === 2 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.sectionTitle }, "Qualifica\u00E7\u00E3o do Solicitante"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.sectionSub }, "Informe os dados de quem est\u00E1 autorizando esta inclus\u00E3o."),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                "Seu nome ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Ponto focal ou pessoa autorizada", value: formData.requesterName, onChange: function (e) { return update('requesterName', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label }, "E-mail"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: solicitanteEmail, readOnly: true })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label }, "Nome da empresa"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: formData.companyName, readOnly: true })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label }, "N\u00FAmero do chamado"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: formData.ticketNumber, readOnly: true })))),
                    step === 3 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.sectionTitle }, "Dados das Inclus\u00F5es"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.sectionSub }, "Adicione as m\u00E1quinas preenchendo os dados b\u00E1sicos dos usu\u00E1rios."),
                        formData.users.map(function (u, i) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { key: i, style: S.itemCard },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.itemCardHeader },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null,
                                    "\uD83D\uDCBB M\u00E1quina ",
                                    i + 1),
                                formData.users.length > 1 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { onClick: function () { return removeUser(i); }, style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.iconBtn), { color: '#ef4444' }), title: "Remover" }, "\uD83D\uDDD1"))),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.itemCardBody },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.group), { marginBottom: '12px' }) },
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                        "Nome completo do usu\u00E1rio ",
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Ex: Jo\u00E3o da Silva", value: u.name, onChange: function (e) { return updateUser(i, 'name', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.grid2 },
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                            "E-mail ",
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "email", placeholder: "joao@empresa.com.br", value: u.email, onChange: function (e) { return updateUser(i, 'email', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                            "Departamento ",
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Ex: Financeiro", value: u.department, onChange: function (e) { return updateUser(i, 'department', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })))))); }),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: S.btnAddMore, onClick: addUser }, "\uFF0B Adicionar mais uma m\u00E1quina"))),
                    step === 4 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.sectionTitle }, "Especifica\u00E7\u00F5es T\u00E9cnicas"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.sectionSub }, "Detalhes de acessos, softwares e impressoras necess\u00E1rios."),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                "Quais pastas ser\u00E3o acessadas na rede/nuvem? ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.textarea), { minHeight: '60px' }), rows: 2, placeholder: "Ex: Servidor Z: // P\u00FAblico / Departamento Pessoal / OneDrive Geral", value: formData.folders, onChange: function (e) { return update('folders', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.grid2 },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                    "ID Team Viewer ",
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#94a3b8', fontWeight: 400 } }, "(Opcional)")),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Ex: 123 456 789", value: formData.teamViewer, onChange: function (e) { return update('teamViewer', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                    "ID AnyDesk ",
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#94a3b8', fontWeight: 400 } }, "(Opcional)")),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Ex: 987 654 321", value: formData.anyDesk, onChange: function (e) { return update('anyDesk', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.helpText },
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "https://anydesk.com/pt/downloads", target: "_blank", rel: "noopener noreferrer", style: { color: theme.primary } }, "Baixar AnyDesk \u2192")))),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                "Quais programas necessitam ser instalados? ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.textarea), { minHeight: '60px' }), rows: 2, placeholder: "Ex: Pacote Office, Emissor de NF, Certificados Digitais...", value: formData.programs, onChange: function (e) { return update('programs', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                "Quais impressoras ser\u00E3o utilizadas? ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Ex: Impressora HP RH, Plotter Engenharia", value: formData.printers, onChange: function (e) { return update('printers', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.group), { background: theme.primaryLight, border: "1px solid ".concat(theme.primaryLighter), borderRadius: '10px', padding: '1rem' }) },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.label), { color: '#1e3a8a' }) },
                                "Login de refer\u00EAncia ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Ex: maria.silva", value: formData.referenceLogin, onChange: function (e) { return update('referenceLogin', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.helpText), { color: '#1e40af', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.3px' }) }, "Login de um colaborador no mesmo departamento para c\u00F3pia de permiss\u00F5es.")))),
                    step === 5 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.sectionTitle }, "Transfer\u00EAncia de Dados"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.sectionSub }, "Indique se ser\u00E1 necess\u00E1rio realizar backup de uma m\u00E1quina antiga para a nova."),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.25rem' } },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.label), { marginBottom: '1rem' }) }, "Haver\u00E1 transfer\u00EAncia de arquivos ou configura\u00E7\u00F5es de uma m\u00E1quina antiga?"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { display: 'flex', gap: '12px' } },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: S.toggleBtn(formData.needsTransfer), onClick: function () { return update('needsTransfer', true); } }, "\u2713 Sim, necessito transfer\u00EAncia"),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: S.toggleBtn(!formData.needsTransfer, '#64748b'), onClick: function () { return update('needsTransfer', false); } }, "N\u00E3o, m\u00E1quina zerada"))),
                        formData.needsTransfer && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' } },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                    "Identifica\u00E7\u00E3o da M\u00E1quina Antiga ",
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Ex: PC-CONTABILIDADE-02 ou Patrim\u00F4nio 1599", value: formData.transferData.oldMachineName, onChange: function (e) { return updateTransfer('oldMachineName', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label }, "Arquivos e Pastas Espec\u00EDficas"),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Ex: C:\\Sistemas\\NFe, Meus Documentos...", value: formData.transferData.filesToTransfer, onChange: function (e) { return updateTransfer('filesToTransfer', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label }, "Configura\u00E7\u00F5es de Softwares"),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Ex: Token banc\u00E1rio, Senhas do sistema ERP...", value: formData.transferData.programsToTransfer, onChange: function (e) { return updateTransfer('programsToTransfer', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.label), { marginBottom: '8px' }) }, "Itens Comuns:"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151', marginBottom: '8px' } },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "checkbox", checked: formData.transferData.transferBrowserFavs, onChange: function (e) { return updateTransfer('transferBrowserFavs', e.target.checked); }, style: { accentColor: theme.primary } }),
                                "Favoritos do Navegador (Chrome/Edge)"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151' } },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "checkbox", checked: formData.transferData.transferEmailSignatures, onChange: function (e) { return updateTransfer('transferEmailSignatures', e.target.checked); }, style: { accentColor: theme.primary } }),
                                "Assinaturas e contatos do Outlook"))))),
                    step === 6 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { textAlign: 'center', marginBottom: '2rem' } },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 12px' } }, "\u2713"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.sectionTitle), { textAlign: 'center' }) }, "Tudo pronto para enviar!"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { fontSize: '13px', color: '#94a3b8' } }, "Revise o resumo antes de enviar.")),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.reviewBox },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.reviewHeader },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "Solicitante"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewValue }, formData.requesterName)),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "Empresa"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewValue }, formData.companyName)),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "Chamado"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewValue },
                                        "#",
                                        formData.ticketNumber))),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { padding: '1rem 1.25rem', borderBottom: '1px solid #f1f5f9' } },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "Total de M\u00E1quinas"),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.reviewValue), { fontSize: '20px', color: theme.primary }) }, formData.users.length)),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { padding: '1rem 1.25rem' } },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "Transfer\u00EAncia de Dados"),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewValue }, formData.needsTransfer ? "\u2713 Sim \u2014 ".concat(formData.transferData.oldMachineName) : '✗ Não necessária'))))),
                    submitStatus === 'error' && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.errorBanner }, "\u26A0 Erro ao enviar. Tente novamente ou entre em contato com o suporte.")),
                    showError && step !== 1 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.errorBanner }, "\u26A0 Por favor, preencha todos os campos obrigat\u00F3rios (*) antes de avan\u00E7ar."))),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.cardFooter },
                    step > 1 ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: S.btnPrev, onClick: prev }, "\u2190 Voltar")) : react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null),
                    step < totalSteps ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: S.btnNext, onClick: next }, "Pr\u00F3ximo \u2192")) : submitStatus === 'success' ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.btnSubmit), { background: '#16a34a', cursor: 'default' }), disabled: true }, "\u2713 Enviado com sucesso!")) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.btnSubmit), { opacity: submitting ? 0.7 : 1 }), onClick: handleSubmit, disabled: submitting }, submitting ? 'Enviando...' : 'Enviar Solicitação')))),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.helpFooter },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: { marginBottom: '6px', fontWeight: 500, color: '#64748b' } }, "N\u00E3o tenho certeza se quero adicionar ou substituir equipamento."),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "https://wa.me/+551139451934", target: "_blank", rel: "noopener noreferrer", style: { color: '#16a34a', fontWeight: 500, marginRight: '16px' } }, "WhatsApp (11) 3945-1934"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "mailto:suporte@phsbrasil.com.br", style: { color: theme.primary, fontWeight: 500 } }, "suporte@phsbrasil.com.br"))),
        showDisagreePopup && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: {
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(3px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
            } },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: {
                    background: '#ffffff', borderRadius: '16px', padding: '2rem',
                    width: '90%', maxWidth: '450px', textAlign: 'center',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                } },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", { style: { fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '1rem' } }, "Aten\u00E7\u00E3o"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: { color: '#475569', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' } },
                    "Caro cliente,",
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null),
                    "Voc\u00EA poder\u00E1 nos consultar via atendimento para tratar quaisquer d\u00FAvidas referentes a este assunto."),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' } },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "mailto:sucessodocliente@phsbrasil.com.br", style: {
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            background: theme.primary, color: '#fff', textDecoration: 'none',
                            padding: '12px', borderRadius: '8px', fontWeight: 500, fontSize: '0.95rem'
                        } }, "\u2709\uFE0F sucessodocliente@phsbrasil.com.br"),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "https://wa.me/551139451934", target: "_blank", rel: "noopener noreferrer", style: {
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            background: '#16a34a', color: '#fff', textDecoration: 'none',
                            padding: '12px', borderRadius: '8px', fontWeight: 500, fontSize: '0.95rem'
                        } }, "\uD83D\uDCF1 WhatsApp: (11) 3945-1934")),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { onClick: function () { return setShowDisagreePopup(false); }, style: {
                        width: '100%', padding: '10px', background: '#f1f5f9', color: '#475569',
                        border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight: 600,
                        cursor: 'pointer', transition: 'background 0.2s'
                    } }, "Fechar"))))));
}


/***/ }),

/***/ 328:
/*!***********************************************************************!*\
  !*** ./lib/webparts/formularioMaquinas/components/FormNovoUsuario.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormNovoUsuario)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _formStyles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formStyles */ 580);




var FLOW_URL = 'https://defaulte8fc68b65d194bf4a2c1a5ed5dc4c2.f5.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/ee360285171e4f5f8091be3cd4e5c204/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Gj4na39slMDwQmm-UCzvgS9GX0-ODgN9DV0mMcaX1Wk';
function FormNovoUsuario(_a) {
    var _this = this;
    var numeroChamado = _a.numeroChamado, nomeEmpresa = _a.nomeEmpresa, solicitanteEmail = _a.solicitanteEmail;
    var theme = _formStyles__WEBPACK_IMPORTED_MODULE_1__.themes.novoUsuario;
    var S = (0,_formStyles__WEBPACK_IMPORTED_MODULE_1__.makeStyles)(theme);
    var _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1), step = _b[0], setStep = _b[1];
    var totalSteps = 4;
    var _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), showError = _c[0], setShowError = _c[1];
    var _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), submitting = _d[0], setSubmitting = _d[1];
    var _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('idle'), submitStatus = _e[0], setSubmitStatus = _e[1];
    // NOVO ESTADO: Controle de exibição do pop-up de discordância
    var _f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), showDisagreePopup = _f[0], setShowDisagreePopup = _f[1];
    var _g = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
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
            return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p), (_a = {}, _a[field] = value, _a)));
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
            return (formData.userNames.trim() && formData.emails.trim() && formData.departments.trim() &&
                formData.folders.trim() && formData.anyDeskId.trim() &&
                formData.programs.trim() && formData.printers.trim() && formData.referenceLogin.trim());
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
    var handleSubmit = function () { return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(_this, void 0, void 0, function () {
        var payload, res, _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__generator)(this, function (_b) {
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
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.page },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.container },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.pageHeader },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.brandName }, "PHS Brasil"),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.brandSub }, "Configura\u00E7\u00E3o de Novo Usu\u00E1rio")),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.stepBadge },
                    "Passo ",
                    step,
                    " de ",
                    totalSteps)),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.progressTrack },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { height: '100%', width: "".concat((step / totalSteps) * 100, "%"), background: theme.primary, borderRadius: '999px', transition: 'width 0.4s ease' } })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.card },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.cardBody },
                    step === 1 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.alertBox), { borderLeftColor: theme.primary, background: theme.primaryLight }) },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { fontSize: '22px', flexShrink: 0 } }, "\u2139\uFE0F"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.alertTitle), { color: '#581c87' }) }, "Sobre esta solicita\u00E7\u00E3o"),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.alertText), { color: '#6b21a8' }) },
                                    "Esta solicita\u00E7\u00E3o visa incluir um ",
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "novo usu\u00E1rio"),
                                    " a uma m\u00E1quina j\u00E1 gerenciada pela PHS Brasil.",
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null),
                                    "N\u00E3o ser\u00E1 configurada m\u00E1quina nova ou substitui\u00E7\u00E3o de m\u00E1quina. Ao prosseguir, voc\u00EA declara estar ciente e de acordo."))),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' } },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.label), { marginBottom: '1rem' }) },
                                "Voc\u00EA leu o aviso acima e est\u00E1 ciente do prop\u00F3sito desta solicita\u00E7\u00E3o? ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.radioCard(formData.agreed === true) },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "radio", name: "agreed", checked: formData.agreed === true, onChange: function () { return update('agreed', true); }, style: { accentColor: theme.primary } }),
                                "Sim, li e estou de acordo."),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.radioCard(formData.agreed === false && formData.agreed !== null) },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "radio", name: "agreed", checked: formData.agreed === false, 
                                    // Só atualiza o estado agora, sem chamar o modal aqui
                                    onChange: function () { return update('agreed', false); } }),
                                "N\u00E3o li ou n\u00E3o estou de acordo.")))),
                    step === 2 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.sectionTitle }, "Qualifica\u00E7\u00E3o do Solicitante"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.sectionSub }, "Sponsor ou pessoa autorizada por ele."),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                "Seu nome ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Nome completo", value: formData.requesterName, onChange: function (e) { return update('requesterName', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label }, "E-mail"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: solicitanteEmail, readOnly: true })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label }, "Nome da empresa"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: formData.companyName, readOnly: true })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label }, "N\u00FAmero do chamado"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: formData.ticketNumber, readOnly: true })))),
                    step === 3 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.sectionTitle }, "Dados da(s) Inclus\u00E3o(\u00F5es)"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.sectionSub }, "Forne\u00E7a os dados t\u00E9cnicos necess\u00E1rios para a configura\u00E7\u00E3o."),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                "Nome completo do(s) usu\u00E1rio(s) ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Insira o(s) nome(s) completo(s)", value: formData.userNames, onChange: function (e) { return update('userNames', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                "E-mail(s) ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Insira o(s) e-mail(s)", value: formData.emails, onChange: function (e) { return update('emails', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                "Departamento(s) ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Insira o(s) departamento(s)", value: formData.departments, onChange: function (e) { return update('departments', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                "Quais pastas ser\u00E3o acessadas na rede/nuvem? ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Insira sua resposta", value: formData.folders, onChange: function (e) { return update('folders', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.grid2 },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                    "ID Team Viewer ",
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#94a3b8', fontWeight: 400 } }, "(Opcional)")),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Ex: 123 456 789", value: formData.teamViewerId, onChange: function (e) { return update('teamViewerId', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                    "ID AnyDesk ",
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Ex: 987 654 321", value: formData.anyDeskId, onChange: function (e) { return update('anyDeskId', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.helpText },
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "https://anydesk.com/pt/downloads", target: "_blank", rel: "noopener noreferrer", style: { color: theme.primary } }, "Baixar AnyDesk \u2192")))),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                "Quais programas necessitam ser instalados? ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Ex: Emissor de NF, Certificados digitais...", value: formData.programs, onChange: function (e) { return update('programs', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                "Quais impressoras ser\u00E3o utilizadas? ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Insira sua resposta", value: formData.printers, onChange: function (e) { return update('printers', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.group), { background: theme.primaryLight, border: "1px solid ".concat(theme.primaryLighter), borderRadius: '10px', padding: '1rem' }) },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.label), { color: '#581c87' }) },
                                "Login de refer\u00EAncia ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Ex: maria.silva", value: formData.referenceLogin, onChange: function (e) { return update('referenceLogin', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.helpText), { color: '#7e22ce', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.3px' }) }, "Login de um colaborador no mesmo departamento para efeito de referenciamento.")))),
                    step === 4 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { textAlign: 'center', marginBottom: '2rem' } },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { width: '64px', height: '64px', borderRadius: '50%', background: theme.primaryLighter, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 12px' } }, "\u2713"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.sectionTitle), { textAlign: 'center' }) }, "Pronto para enviar!"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { fontSize: '13px', color: '#94a3b8' } }, "Revise o resumo antes de enviar.")),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.reviewBox },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.reviewHeader },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "Solicitante"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewValue }, formData.requesterName)),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "Empresa"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewValue }, formData.companyName)),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "Chamado"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewValue },
                                        "#",
                                        formData.ticketNumber))),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { padding: '12px 16px', borderBottom: '1px solid #f1f5f9' } },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "Usu\u00E1rios"),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewValue }, formData.userNames || '—')),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { padding: '12px 16px', borderBottom: '1px solid #f1f5f9' } },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "E-mails"),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewValue }, formData.emails || '—')),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { padding: '12px 16px' } },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "Departamentos"),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewValue }, formData.departments || '—'))),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.alertBox), { marginTop: '1.5rem', borderLeftColor: theme.primary, background: theme.primaryLight }) },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { fontSize: '22px', flexShrink: 0 } }, "\uD83D\uDCAC"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.alertTitle), { color: '#581c87' }) }, "N\u00E3o tem certeza sobre sua necessidade?"),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.alertText), { color: '#6b21a8' }) },
                                    "Consulte nossos t\u00E9cnicos: WhatsApp (11) 3945-1934 ou ",
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "mailto:suporte@phsbrasil.com.br", style: { color: theme.primary } }, "suporte@phsbrasil.com.br")))))),
                    submitStatus === 'error' && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.errorBanner }, "\u26A0 Erro ao enviar. Tente novamente ou entre em contato com o suporte.")),
                    showError && step !== 1 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.errorBanner }, "\u26A0 Por favor, preencha todos os campos obrigat\u00F3rios (*) antes de avan\u00E7ar."))),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.cardFooter },
                    step > 1 ? react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: S.btnPrev, onClick: prev }, "\u2190 Voltar") : react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null),
                    step < totalSteps ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: S.btnNext, onClick: next }, "Pr\u00F3ximo \u2192")) : (submitStatus === 'success' ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.btnSubmit), { background: '#16a34a', cursor: 'default' }), disabled: true }, "\u2713 Enviado com sucesso!")) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.btnSubmit), { opacity: submitting ? 0.7 : 1 }), onClick: handleSubmit, disabled: submitting }, submitting ? 'Enviando...' : 'Enviar Solicitação'))))),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.helpFooter },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: { marginBottom: '6px', fontWeight: 500, color: '#64748b' } }, "N\u00E3o tem certeza se precisa de novo usu\u00E1rio ou nova m\u00E1quina?"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "https://wa.me/+551139451934", target: "_blank", rel: "noopener noreferrer", style: { color: '#16a34a', fontWeight: 500, marginRight: '16px' } }, "WhatsApp (11) 3945-1934"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "mailto:suporte@phsbrasil.com.br", style: { color: theme.primary, fontWeight: 500 } }, "suporte@phsbrasil.com.br"))),
        showDisagreePopup && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: {
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(3px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
            } },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: {
                    background: '#ffffff', borderRadius: '16px', padding: '2rem',
                    width: '90%', maxWidth: '450px', textAlign: 'center',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                } },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", { style: { fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '1rem' } }, "Aten\u00E7\u00E3o"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: { color: '#475569', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' } },
                    "Caro cliente,",
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null),
                    "Voc\u00EA poder\u00E1 nos consultar via atendimento para tratar quaisquer d\u00FAvidas referentes a este assunto."),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' } },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "mailto:sucessodocliente@phsbrasil.com.br", style: {
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            background: theme.primary, color: '#fff', textDecoration: 'none',
                            padding: '12px', borderRadius: '8px', fontWeight: 500, fontSize: '0.95rem'
                        } }, "\u2709\uFE0F sucessodocliente@phsbrasil.com.br"),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "https://wa.me/551139451934", target: "_blank", rel: "noopener noreferrer", style: {
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            background: '#16a34a', color: '#fff', textDecoration: 'none',
                            padding: '12px', borderRadius: '8px', fontWeight: 500, fontSize: '0.95rem'
                        } }, "\uD83D\uDCF1 WhatsApp: (11) 3945-1934")),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { onClick: function () { return setShowDisagreePopup(false); }, style: {
                        width: '100%', padding: '10px', background: '#f1f5f9', color: '#475569',
                        border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight: 600,
                        cursor: 'pointer', transition: 'background 0.2s'
                    } }, "Fechar"))))));
}


/***/ }),

/***/ 245:
/*!************************************************************************!*\
  !*** ./lib/webparts/formularioMaquinas/components/FormSubstituicao.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormSubstituicao)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 196);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 959);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _formStyles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formStyles */ 580);




var FLOW_URL = 'https://defaulte8fc68b65d194bf4a2c1a5ed5dc4c2.f5.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/ee360285171e4f5f8091be3cd4e5c204/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Gj4na39slMDwQmm-UCzvgS9GX0-ODgN9DV0mMcaX1Wk';
var blankReplacement = function () { return ({
    oldTag: '', oldEmail: '', oldDepartment: '', newAnyDesk: '', sameUser: true,
    newUser: { name: '', email: '', department: '' }, needsTransfer: false, transferDetails: { files: '', programs: '' },
}); };
function FormSubstituicao(_a) {
    var _this = this;
    var numeroChamado = _a.numeroChamado, nomeEmpresa = _a.nomeEmpresa, solicitanteEmail = _a.solicitanteEmail;
    var theme = _formStyles__WEBPACK_IMPORTED_MODULE_1__.themes.substituicao;
    var S = (0,_formStyles__WEBPACK_IMPORTED_MODULE_1__.makeStyles)(theme);
    var _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1), step = _b[0], setStep = _b[1];
    var totalSteps = 4;
    var _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), showError = _c[0], setShowError = _c[1];
    var _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), submitting = _d[0], setSubmitting = _d[1];
    var _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('idle'), submitStatus = _e[0], setSubmitStatus = _e[1];
    // Controle de exibição do pop-up de discordância
    var _f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), showDisagreePopup = _f[0], setShowDisagreePopup = _f[1];
    var _g = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
        agreed: null,
        requesterName: '',
        companyName: nomeEmpresa || '',
        ticketNumber: numeroChamado || '',
        replacements: [blankReplacement()],
    }), formData = _g[0], setFormData = _g[1];
    var update = function (field, value) { setFormData(function (p) {
        var _a;
        return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p), (_a = {}, _a[field] = value, _a)));
    }); if (showError)
        setShowError(false); };
    var updateRep = function (i, field, value) {
        var _a;
        var arr = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)([], formData.replacements, true);
        arr[i] = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, arr[i]), (_a = {}, _a[field] = value, _a));
        setFormData(function (p) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p), { replacements: arr })); });
    };
    var updateNewUser = function (i, field, value) {
        var _a;
        var arr = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)([], formData.replacements, true);
        arr[i] = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, arr[i]), { newUser: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, arr[i].newUser), (_a = {}, _a[field] = value, _a)) });
        setFormData(function (p) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p), { replacements: arr })); });
    };
    var updateTransfer = function (i, field, value) {
        var _a;
        var arr = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)([], formData.replacements, true);
        arr[i] = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, arr[i]), { transferDetails: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, arr[i].transferDetails), (_a = {}, _a[field] = value, _a)) });
        setFormData(function (p) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p), { replacements: arr })); });
    };
    var addReplacement = function () { return setFormData(function (p) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p), { replacements: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)([], p.replacements, true), [blankReplacement()], false) })); }); };
    var removeReplacement = function (i) {
        if (formData.replacements.length === 1)
            return;
        setFormData(function (p) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, p), { replacements: p.replacements.filter(function (_, idx) { return idx !== i; }) })); });
    };
    var validate = function (s) {
        if (s === 1)
            return formData.agreed === true;
        if (s === 2)
            return formData.requesterName.trim();
        if (s === 3)
            return formData.replacements.every(function (r) {
                var oldOk = r.oldTag.trim() && r.oldEmail.trim() && r.oldDepartment.trim();
                var newOk = r.sameUser || (r.newUser.name.trim() && r.newUser.email.trim() && r.newUser.department.trim());
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
    var handleSubmit = function () { return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(_this, void 0, void 0, function () {
        var payload, res, _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    payload = {
                        tipoFormulario: 'substituicao',
                        solicitante: formData.requesterName,
                        solicitanteEmail: solicitanteEmail,
                        empresa: formData.companyName,
                        numeroChamado: formData.ticketNumber,
                        substituicoes: formData.replacements.map(function (r) { return ({
                            maquinaAntiga: {
                                tag: r.oldTag,
                                emailUsuario: r.oldEmail,
                                departamento: r.oldDepartment,
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
                        }); }),
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
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.page },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.container },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.pageHeader },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.brandName }, "PHS Brasil"),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.brandSub }, "Substitui\u00E7\u00E3o de Equipamentos")),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.stepBadge },
                    "Passo ",
                    step,
                    " de ",
                    totalSteps)),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.progressTrack },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { height: '100%', width: "".concat((step / totalSteps) * 100, "%"), background: theme.primary, borderRadius: '999px', transition: 'width 0.4s ease' } })),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.card },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.cardBody },
                    step === 1 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.alertBox },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { fontSize: '22px', flexShrink: 0 } }, "\u26A0\uFE0F"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.alertTitle }, "Termo de Substitui\u00E7\u00E3o"),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.alertText },
                                    "Ao solicitar uma substitui\u00E7\u00E3o, voc\u00EA entende que a ",
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "m\u00E1quina substitu\u00EDda (Antiga)"),
                                    " ser\u00E1 retirada de nosso gerenciamento.",
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null),
                                    "Bem como a ",
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "m\u00E1quina colocada em seu lugar (Nova)"),
                                    " deve permanecer em nosso contrato por no m\u00EDnimo ",
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "06 meses"),
                                    ", sem possibilidade de exclus\u00E3o e/ou nova substitui\u00E7\u00E3o da mesma."))),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' } },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.label), { marginBottom: '1rem' }) },
                                "Voc\u00EA leu o aviso acima e est\u00E1 ciente da pol\u00EDtica de car\u00EAncia (06 meses)? ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.radioCard(formData.agreed === true) },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "radio", name: "agreed", checked: formData.agreed === true, onChange: function () { return update('agreed', true); }, style: { accentColor: theme.primary } }),
                                "Sim, li e estou de acordo."),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.radioCard(formData.agreed === false && formData.agreed !== null) },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "radio", name: "agreed", checked: formData.agreed === false, onChange: function () { return update('agreed', false); } }),
                                "N\u00E3o li ou n\u00E3o estou de acordo.")))),
                    step === 2 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.sectionTitle }, "Qualifica\u00E7\u00E3o do Solicitante"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.sectionSub }, "Informe os dados do Sponsor ou pessoa autorizada para esta troca."),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                "Seu nome ",
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Sponsor ou pessoa autorizada por ele", value: formData.requesterName, onChange: function (e) { return update('requesterName', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label }, "E-mail"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: solicitanteEmail, readOnly: true })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label }, "Nome da empresa"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: formData.companyName, readOnly: true })),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label }, "N\u00FAmero do chamado"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.input), { background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }), type: "text", value: formData.ticketNumber, readOnly: true })))),
                    step === 3 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: S.sectionTitle }, "Mapeamento de Substitui\u00E7\u00F5es"),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.sectionSub }, "Vincule cada m\u00E1quina antiga com a respectiva m\u00E1quina nova."),
                        formData.replacements.map(function (rep, i) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { key: i, style: S.itemCard },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.itemCardHeader },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null,
                                    "\uD83D\uDD04 Troca de Equipamento ",
                                    i + 1),
                                formData.replacements.length > 1 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { onClick: function () { return removeReplacement(i); }, style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.iconBtn), { color: '#ef4444' }) }, "\uD83D\uDDD1"))),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.itemCardBody },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', marginBottom: '8px' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: { fontSize: '12px', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' } }, "\uD83D\uDDA5 1. M\u00E1quina que ser\u00E1 retirada (Antiga)"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.grid3 },
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                                "TAG / Patrim\u00F4nio ",
                                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Ex: PC-05", value: rep.oldTag, onChange: function (e) { return updateRep(i, 'oldTag', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                                "E-mail do usu\u00E1rio ",
                                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "email", placeholder: "usuario@empresa.com", value: rep.oldEmail, onChange: function (e) { return updateRep(i, 'oldEmail', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                                "Departamento ",
                                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Ex: Financeiro", value: rep.oldDepartment, onChange: function (e) { return updateRep(i, 'oldDepartment', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })))),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { textAlign: 'center', padding: '4px 0', color: '#94a3b8', fontSize: '20px' } }, "\u2193"),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem' } },
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: { fontSize: '12px', fontWeight: 700, color: '#14532d', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' } }, "\uD83D\uDCBB 2. M\u00E1quina que entrar\u00E1 no lugar (Nova)"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.group },
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                            "AnyDesk da M\u00E1quina Nova ",
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#94a3b8', fontWeight: 400 } }, "(Opcional)")),
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", placeholder: "Ex: 123 456 789", value: rep.newAnyDesk, onChange: function (e) { return updateRep(i, 'newAnyDesk', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur }),
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.helpText },
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "https://anydesk.com/pt/downloads", target: "_blank", rel: "noopener noreferrer", style: { color: theme.primary } }, "Baixar AnyDesk \u2192"))),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { background: '#fff', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem', marginBottom: '10px' } },
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.label), { marginBottom: '10px' }) },
                                            "A m\u00E1quina nova ser\u00E1 destinada ao mesmo colaborador? ",
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { display: 'flex', gap: '10px' } },
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: S.toggleBtn(rep.sameUser), onClick: function () { return updateRep(i, 'sameUser', true); } }, "Sim, mesmo usu\u00E1rio"),
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: S.toggleBtn(!rep.sameUser, '#d97706'), onClick: function () { return updateRep(i, 'sameUser', false); } }, "N\u00E3o, outro usu\u00E1rio")),
                                        !rep.sameUser && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' } },
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.grid3 },
                                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                                        "Nome Completo ",
                                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", value: rep.newUser.name, onChange: function (e) { return updateNewUser(i, 'name', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                                        "Novo E-mail ",
                                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "email", value: rep.newUser.email, onChange: function (e) { return updateNewUser(i, 'email', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label },
                                                        "Novo Departamento ",
                                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { color: '#ef4444' } }, "*")),
                                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { style: S.input, type: "text", value: rep.newUser.department, onChange: function (e) { return updateNewUser(i, 'department', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })))))),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { background: '#fff', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem' } },
                                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: rep.needsTransfer ? '12px' : '0' } },
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { fontSize: '14px', fontWeight: 600, color: '#374151' } }, "Necessita transferir dados da antiga?"),
                                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { display: 'block', fontSize: '12px', color: '#94a3b8' } }, "Arquivos, configura\u00E7\u00F5es, favoritos, etc.")),
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: rep.needsTransfer ? theme.primary : '#64748b' } },
                                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "checkbox", checked: rep.needsTransfer, onChange: function (e) { return updateRep(i, 'needsTransfer', e.target.checked); }, style: { accentColor: theme.primary, width: '16px', height: '16px' } }),
                                                rep.needsTransfer ? 'Sim' : 'Não')),
                                        rep.needsTransfer && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { paddingTop: '12px', borderTop: '1px solid #e2e8f0' } },
                                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.grid2 },
                                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label }, "Pastas / Arquivos espec\u00EDficos"),
                                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Ex: C:\\Sistemas, Meus Documentos...", value: rep.transferDetails.files, onChange: function (e) { return updateTransfer(i, 'files', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })),
                                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { style: S.label }, "Softwares / Configura\u00E7\u00F5es"),
                                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.textarea), { minHeight: '56px' }), rows: 2, placeholder: "Ex: Certificados, Favoritos Chrome...", value: rep.transferDetails.programs, onChange: function (e) { return updateTransfer(i, 'programs', e.target.value); }, onFocus: inputFocus, onBlur: inputBlur })))))))))); }),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: S.btnAddMore, onClick: addReplacement }, "\uFF0B Adicionar outra substitui\u00E7\u00E3o"))),
                    step === 4 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { textAlign: 'center', marginBottom: '2rem' } },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 12px' } }, "\u2713"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.sectionTitle), { textAlign: 'center' }) }, "Pronto para Solicitar Substitui\u00E7\u00E3o!"),
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: { fontSize: '13px', color: '#94a3b8' } }, "Revise o resumo das trocas antes de enviar.")),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.reviewBox },
                            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.reviewHeader },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "Solicitante"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewValue }, formData.requesterName)),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "Empresa"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewValue }, formData.companyName)),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewLabel }, "Chamado"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: S.reviewValue },
                                        "#",
                                        formData.ticketNumber))),
                            formData.replacements.map(function (rep, i) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { key: i, style: { padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '24px', alignItems: 'center' } },
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { flex: 1 } },
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.reviewLabel), { color: '#dc2626' }) }, "Sai"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { fontWeight: 700, color: '#1e293b' } }, rep.oldTag || 'Sem TAG'),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { fontSize: '12px', color: '#94a3b8' } }, rep.oldEmail)),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { color: '#94a3b8', fontSize: '20px' } }, "\u2192"),
                                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { flex: 1 } },
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.reviewLabel), { color: '#16a34a' }) }, "Entra"),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { fontWeight: 700, color: '#1e293b' } }, rep.sameUser ? 'Mesmo Usuário' : rep.newUser.name),
                                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { fontSize: '12px', color: '#94a3b8' } },
                                        "Transf. Dados: ",
                                        rep.needsTransfer ? 'Sim' : 'Não')))); })))),
                    submitStatus === 'error' && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.errorBanner }, "\u26A0 Erro ao enviar. Tente novamente ou entre em contato com o suporte.")),
                    showError && step !== 1 && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.errorBanner }, "\u26A0 Por favor, preencha todos os campos obrigat\u00F3rios (*) antes de avan\u00E7ar."))),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.cardFooter },
                    step > 1 ? react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: S.btnPrev, onClick: prev }, "\u2190 Voltar") : react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null),
                    step < totalSteps ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: S.btnNext, onClick: next }, "Pr\u00F3ximo \u2192")) : (submitStatus === 'success' ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.btnSubmit), { background: '#16a34a', cursor: 'default' }), disabled: true }, "\u2713 Enviado com sucesso!")) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, S.btnSubmit), { opacity: submitting ? 0.7 : 1 }), onClick: handleSubmit, disabled: submitting }, submitting ? 'Enviando...' : 'Enviar Solicitação'))))),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: S.helpFooter },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: { marginBottom: '6px', fontWeight: 500, color: '#64748b' } }, "N\u00E3o tem certeza se quer adicionar nova ou substituir?"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "https://wa.me/+551139451934", target: "_blank", rel: "noopener noreferrer", style: { color: '#16a34a', fontWeight: 500, marginRight: '16px' } }, "WhatsApp (11) 3945-1934"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "mailto:suporte@phsbrasil.com.br", style: { color: theme.primary, fontWeight: 500 } }, "suporte@phsbrasil.com.br"))),
        showDisagreePopup && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: {
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(3px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
            } },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: {
                    background: '#ffffff', borderRadius: '16px', padding: '2rem',
                    width: '90%', maxWidth: '450px', textAlign: 'center',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                } },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", { style: { fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '1rem' } }, "Aten\u00E7\u00E3o"),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { style: { color: '#475569', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' } },
                    "Caro cliente,",
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null),
                    "Voc\u00EA poder\u00E1 nos consultar via atendimento para tratar quaisquer d\u00FAvidas referentes a este assunto."),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' } },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "mailto:sucessodocliente@phsbrasil.com.br", style: {
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            background: theme.primary, color: '#fff', textDecoration: 'none',
                            padding: '12px', borderRadius: '8px', fontWeight: 500, fontSize: '0.95rem'
                        } }, "\u2709\uFE0F sucessodocliente@phsbrasil.com.br"),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", { href: "https://wa.me/551139451934", target: "_blank", rel: "noopener noreferrer", style: {
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            background: '#16a34a', color: '#fff', textDecoration: 'none',
                            padding: '12px', borderRadius: '8px', fontWeight: 500, fontSize: '0.95rem'
                        } }, "\uD83D\uDCF1 WhatsApp: (11) 3945-1934")),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { onClick: function () { return setShowDisagreePopup(false); }, style: {
                        width: '100%', padding: '10px', background: '#f1f5f9', color: '#475569',
                        border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight: 600,
                        cursor: 'pointer', transition: 'background 0.2s'
                    } }, "Fechar"))))));
}


/***/ }),

/***/ 399:
/*!**************************************************************************!*\
  !*** ./lib/webparts/formularioMaquinas/components/FormularioMaquinas.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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


/***/ }),

/***/ 580:
/*!******************************************************************!*\
  !*** ./lib/webparts/formularioMaquinas/components/formStyles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeStyles: () => (/* binding */ makeStyles),
/* harmony export */   themes: () => (/* binding */ themes)
/* harmony export */ });
var themes = {
    inclusao: {
        primary: '#2563eb',
        primaryHover: '#1d4ed8',
        primaryLight: '#eff6ff',
        primaryLighter: '#dbeafe',
        alertBg: '#fffbeb',
        alertBorder: '#f59e0b',
        alertText: '#92400e',
        alertTitle: '#78350f',
    },
    exclusao: {
        primary: '#dc2626',
        primaryHover: '#b91c1c',
        primaryLight: '#fef2f2',
        primaryLighter: '#fecaca',
        alertBg: '#fffbeb',
        alertBorder: '#f59e0b',
        alertText: '#92400e',
        alertTitle: '#78350f',
    },
    substituicao: {
        primary: '#2563eb',
        primaryHover: '#1d4ed8',
        primaryLight: '#eff6ff',
        primaryLighter: '#dbeafe',
        alertBg: '#fffbeb',
        alertBorder: '#f59e0b',
        alertText: '#92400e',
        alertTitle: '#78350f',
    },
    novoUsuario: {
        primary: '#9333ea',
        primaryHover: '#7e22ce',
        primaryLight: '#faf5ff',
        primaryLighter: '#e9d5ff',
        alertBg: '#fffbeb',
        alertBorder: '#f59e0b',
        alertText: '#92400e',
        alertTitle: '#78350f',
    },
};
var makeStyles = function (theme) { return ({
    // PAGE
    page: {
        minHeight: '100vh',
        background: '#f8fafc',
        padding: '2rem 1rem',
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        boxSizing: 'border-box',
    },
    container: {
        maxWidth: '800px',
        margin: '0 auto',
    },
    // HEADER
    pageHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    brandName: {
        fontSize: '22px',
        fontWeight: 800,
        color: theme.primary,
        margin: 0,
        letterSpacing: '-0.5px',
    },
    brandSub: {
        fontSize: '11px',
        fontWeight: 500,
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        marginTop: '2px',
    },
    stepBadge: {
        fontSize: '13px',
        color: '#94a3b8',
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '999px',
        padding: '4px 14px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        whiteSpace: 'nowrap',
    },
    // PROGRESS
    progressTrack: {
        width: '100%',
        height: '8px',
        background: '#e2e8f0',
        borderRadius: '999px',
        marginBottom: '2rem',
        overflow: 'hidden',
    },
    // CARD
    card: {
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
        overflow: 'hidden',
    },
    cardBody: {
        padding: '2.5rem',
    },
    cardFooter: {
        background: '#f8fafc',
        borderTop: '1px solid #f1f5f9',
        padding: '1rem 2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    // ALERT BOX
    alertBox: {
        background: theme.alertBg,
        borderLeft: "4px solid ".concat(theme.alertBorder),
        borderRadius: '0 10px 10px 0',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.5rem',
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'flex-start',
    },
    alertTitle: {
        fontSize: '15px',
        fontWeight: 600,
        color: theme.alertTitle,
        marginBottom: '6px',
        marginTop: 0,
    },
    alertText: {
        fontSize: '13px',
        color: theme.alertText,
        lineHeight: 1.65,
        margin: 0,
    },
    // SECTION TITLE
    sectionTitle: {
        fontSize: '19px',
        fontWeight: 700,
        color: '#1e293b',
        marginBottom: '4px',
        marginTop: 0,
    },
    sectionSub: {
        fontSize: '13px',
        color: '#94a3b8',
        marginBottom: '1.5rem',
        display: 'block',
    },
    // QUESTION GROUP
    group: {
        marginBottom: '1.5rem',
    },
    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: 600,
        color: '#374151',
        marginBottom: '6px',
    },
    helpText: {
        display: 'block',
        fontSize: '12px',
        color: '#94a3b8',
        marginBottom: '6px',
    },
    // INPUTS
    input: {
        display: 'block',
        width: '100%',
        padding: '10px 14px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#1e293b',
        background: '#fff',
        boxSizing: 'border-box',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        outline: 'none',
    },
    textarea: {
        display: 'block',
        width: '100%',
        padding: '10px 14px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#1e293b',
        background: '#fff',
        boxSizing: 'border-box',
        resize: 'vertical',
        outline: 'none',
    },
    select: {
        display: 'block',
        width: '100%',
        padding: '10px 14px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#1e293b',
        background: '#fff',
        boxSizing: 'border-box',
        outline: 'none',
        cursor: 'pointer',
    },
    // RADIO OPTIONS (styled cards)
    radioCard: function (selected) { return ({
        display: 'flex',
        alignItems: 'center',
        padding: '14px 16px',
        border: selected ? "2px solid ".concat(theme.primary) : '1px solid #e2e8f0',
        borderRadius: '10px',
        cursor: 'pointer',
        background: selected ? theme.primaryLight : '#fff',
        transition: 'all 0.15s',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: 500,
        color: selected ? theme.primary : '#374151',
        gap: '10px',
    }); },
    // BUTTONS
    btnPrev: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 20px',
        border: 'none',
        background: 'transparent',
        color: '#64748b',
        fontSize: '14px',
        fontWeight: 500,
        cursor: 'pointer',
        borderRadius: '8px',
        transition: 'color 0.15s, background 0.15s',
    },
    btnNext: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 24px',
        border: 'none',
        background: theme.primary,
        color: '#fff',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        borderRadius: '8px',
        boxShadow: "0 2px 8px ".concat(theme.primary, "55"),
        transition: 'background 0.15s, box-shadow 0.15s',
    },
    btnSubmit: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 28px',
        border: 'none',
        background: '#16a34a',
        color: '#fff',
        fontSize: '15px',
        fontWeight: 700,
        cursor: 'pointer',
        borderRadius: '8px',
        boxShadow: '0 2px 8px #16a34a55',
        transition: 'background 0.15s',
    },
    // ADD MORE BUTTON (dashed)
    btnAddMore: {
        width: '100%',
        padding: '16px',
        border: '2px dashed #d1d5db',
        borderRadius: '12px',
        background: 'transparent',
        color: '#94a3b8',
        fontSize: '14px',
        fontWeight: 500,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.15s',
        marginTop: '1rem',
    },
    // ITEM CARD (for lists of machines, users, etc.)
    itemCard: {
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    },
    itemCardHeader: {
        background: '#f8fafc',
        padding: '12px 16px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12px',
        fontWeight: 700,
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    itemCardBody: {
        padding: '16px',
    },
    // GRID
    grid2: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
    },
    grid3: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '12px',
    },
    // ERROR
    errorBanner: {
        background: '#fef2f2',
        border: '1px solid #fecaca',
        color: '#dc2626',
        borderRadius: '8px',
        padding: '10px 14px',
        fontSize: '13px',
        marginTop: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    // REVIEW CARD (last step)
    reviewBox: {
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflow: 'hidden',
        fontSize: '14px',
    },
    reviewHeader: {
        background: '#f8fafc',
        padding: '1rem 1.25rem',
        borderBottom: '1px solid #e2e8f0',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
    },
    reviewLabel: {
        display: 'block',
        fontSize: '11px',
        color: '#94a3b8',
        marginBottom: '2px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    reviewValue: {
        fontWeight: 700,
        color: '#1e293b',
    },
    // HELP FOOTER
    helpFooter: {
        marginTop: '2rem',
        textAlign: 'center',
        fontSize: '13px',
        color: '#94a3b8',
    },
    // TOGGLE
    toggleBtn: function (active, color) { return ({
        flex: 1,
        padding: '10px 16px',
        border: active ? "2px solid ".concat(color || theme.primary) : '1px solid #e2e8f0',
        borderRadius: '8px',
        background: active ? (color ? color + '15' : theme.primaryLight) : '#fff',
        color: active ? (color || theme.primary) : '#64748b',
        fontSize: '13px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.15s',
    }); },
    // ICON BUTTON
    iconBtn: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: '#94a3b8',
        padding: '4px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '18px',
        transition: 'color 0.15s, background 0.15s',
    },
}); };


/***/ }),

/***/ 223:
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ 216:
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ 196:
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}


/***/ }),

/***/ 976:
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebSocketClient)
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ 43);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/** @typedef {import("../index").EXPECTED_ANY} EXPECTED_ANY */

/**
 * @implements {CommunicationClient}
 */
var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url url to connect
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);
    this.client = new WebSocket(url);
    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }

  /**
   * @param {(...args: EXPECTED_ANY[]) => void} fn function
   */
  return _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(fn) {
      this.client.onopen = fn;
    }

    /**
     * @param {(...args: EXPECTED_ANY[]) => void} fn function
     */
  }, {
    key: "onClose",
    value: function onClose(fn) {
      this.client.onclose = fn;
    }

    // call f with the message string as the first argument
    /**
     * @param {(...args: EXPECTED_ANY[]) => void} fn function
     */
  }, {
    key: "onMessage",
    value: function onMessage(fn) {
      this.client.onmessage = function (err) {
        fn(err.data);
      };
    }
  }]);
}();


/***/ }),

/***/ 29:
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=wss&hostname=localhost&port=4321&pathname=%2Fws&logging=info&overlay=false&reconnect=10&hot=true&live-reload=true ***!
  \************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
var __resourceQuery = "?protocol=wss&hostname=localhost&port=4321&pathname=%2Fws&logging=info&overlay=false&reconnect=10&hot=true&live-reload=true";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSocketURL: () => (/* binding */ createSocketURL),
/* harmony export */   getCurrentScriptSource: () => (/* binding */ getCurrentScriptSource),
/* harmony export */   parseURL: () => (/* binding */ parseURL)
/* harmony export */ });
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ 689);
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webpack/hot/log.js */ 509);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overlay.js */ 887);
/* harmony import */ var _progress_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./progress.js */ 40);
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ 930);
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/log.js */ 43);
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/sendMessage.js */ 912);
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/* global __resourceQuery, __webpack_hash__ */
// @ts-expect-error

// @ts-expect-error







// eslint-disable-next-line jsdoc/no-restricted-syntax
/** @typedef {any} EXPECTED_ANY */

/**
 * @typedef {object} RawOverlayOptions
 * @property {string=} warnings warnings
 * @property {string=} errors errors
 * @property {string=} runtimeErrors runtime errors
 * @property {string=} trustedTypesPolicyName trusted types policy name
 */

/**
 * @typedef {object} OverlayOptions
 * @property {(boolean | ((error: Error) => boolean))=} warnings warnings
 * @property {(boolean | ((error: Error) => boolean))=} errors errors
 * @property {(boolean | ((error: Error) => boolean))=} runtimeErrors runtime errors
 * @property {string=} trustedTypesPolicyName trusted types policy name
 */

/** @typedef {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} LogLevel */

/**
 * @typedef {object} Options
 * @property {boolean} hot true when hot enabled, otherwise false
 * @property {boolean} liveReload true when live reload enabled, otherwise false
 * @property {boolean} progress true when need to show progress, otherwise false
 * @property {boolean | OverlayOptions} overlay overlay options
 * @property {LogLevel=} logging logging level
 * @property {number=} reconnect count of allowed reconnection
 */

/**
 * @typedef {object} Status
 * @property {boolean} isUnloading true when unloaded, otherwise false
 * @property {string} currentHash current hash
 * @property {string=} previousHash previous hash
 */

/**
 * @param {boolean | RawOverlayOptions | OverlayOptions} overlayOptions overlay options
 */
var decodeOverlayOptions = function decodeOverlayOptions(overlayOptions) {
  if (_typeof(overlayOptions) === "object") {
    var requiredOptions = ["warnings", "errors", "runtimeErrors"];
    for (var i = 0; i < requiredOptions.length; i++) {
      var property = /** @type {keyof Omit<RawOverlayOptions, "trustedTypesPolicyName">} */
      requiredOptions[i];
      if (typeof overlayOptions[property] === "string") {
        var overlayFilterFunctionString = decodeURIComponent(overlayOptions[property]);

        /** @type {OverlayOptions} */
        overlayOptions[property] = /** @type {(error: Error) => boolean} */
        // eslint-disable-next-line no-new-func
        new Function("message", "var callback = ".concat(overlayFilterFunctionString, "\n        return callback(message)"));
      }
    }
  }
};

/**
 * @type {Status}
 */
var status = {
  isUnloading: false,
  currentHash: __webpack_require__.h()
};

/**
 * @returns {string} current script source
 */
var getCurrentScriptSource = function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return /** @type {string} */document.currentScript.getAttribute("src");
  }

  // Fallback to getting all scripts running in the document.
  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });
  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  }

  // Fail as there was no script to use.
  throw new Error("[webpack-dev-server] Failed to get current script source.");
};

/** @typedef {{ hot?: string, ["live-reload"]?: string, progress?: string, reconnect?: string, logging?: LogLevel, overlay?: string, fromCurrentScript?: boolean }} AdditionalParsedURL */
/** @typedef {Partial<URL> & AdditionalParsedURL} ParsedURL */

/**
 * @param {string} resourceQuery resource query
 * @returns {ParsedURL} parsed URL
 */
var parseURL = function parseURL(resourceQuery) {
  /** @type {ParsedURL} */
  var result = {};
  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.slice(1).split("&");
    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");

      /** @type {EXPECTED_ANY} */
      result[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = getCurrentScriptSource();
    var scriptSourceURL;
    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (_err) {
      // URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }
    if (scriptSourceURL) {
      result = scriptSourceURL;
      result.fromCurrentScript = true;
    }
  }
  return result;
};
var parsedResourceQuery = parseURL(__resourceQuery);

/** @typedef {{ ["Hot Module Replacement"]: boolean, ["Live Reloading"]: boolean, Progress: boolean, Overlay: boolean }} Features */

/** @type {Features} */
var enabledFeatures = {
  "Hot Module Replacement": false,
  "Live Reloading": false,
  Progress: false,
  Overlay: false
};

/** @type {Options} */
var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  enabledFeatures["Hot Module Replacement"] = true;
}
if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  enabledFeatures["Live Reloading"] = true;
}
if (parsedResourceQuery.progress === "true") {
  options.progress = true;
  enabledFeatures.Progress = true;
}
if (parsedResourceQuery.overlay) {
  try {
    options.overlay = JSON.parse(parsedResourceQuery.overlay);
  } catch (err) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.error("Error parsing overlay options from resource query:", err);
  }

  // Fill in default "true" params for partially-specified objects.
  if (_typeof(options.overlay) === "object") {
    options.overlay = _objectSpread({
      errors: true,
      warnings: true,
      runtimeErrors: true
    }, options.overlay);
    decodeOverlayOptions(options.overlay);
  }
  enabledFeatures.Overlay = options.overlay !== false;
}
if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}
if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}

/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level level
 */
var setAllLogLevel = function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_1___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_4__.setLogLevel)(level);
};
if (options.logging) {
  setAllLogLevel(options.logging);
}

/**
 * @param {Features} features features
 */
var logEnabledFeatures = function logEnabledFeatures(features) {
  var listEnabledFeatures = Object.keys(features);
  if (!features || listEnabledFeatures.length === 0) {
    return;
  }
  var logString = "Server started:";

  // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.
  for (var i = 0; i < listEnabledFeatures.length; i++) {
    var key = /** @type {keyof Features} */listEnabledFeatures[i];
    logString += " ".concat(key, " ").concat(features[key] ? "enabled" : "disabled", ",");
  }
  // replace last comma with a period
  logString = logString.slice(0, -1).concat(".");
  _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info(logString);
};
logEnabledFeatures(enabledFeatures);
self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var overlay = typeof window !== "undefined" ? (0,_overlay_js__WEBPACK_IMPORTED_MODULE_2__.createOverlay)(_typeof(options.overlay) === "object" ? {
  trustedTypesPolicyName: options.overlay.trustedTypesPolicyName,
  catchRuntimeError: options.overlay.runtimeErrors
} : {
  trustedTypesPolicyName: false,
  catchRuntimeError: options.overlay
}) : {
  send: function send() {}
};

/**
 * @param {Options} options options
 * @param {Status} currentStatus current status
 */
var reloadApp = function reloadApp(_ref, currentStatus) {
  var hot = _ref.hot,
    liveReload = _ref.liveReload;
  if (currentStatus.isUnloading) {
    return;
  }
  var currentHash = currentStatus.currentHash,
    previousHash = currentStatus.previousHash;
  var isInitial = currentHash.indexOf(/** @type {string} */previousHash) >= 0;
  if (isInitial) {
    return;
  }

  /**
   * @param {Window} rootWindow root window
   * @param {number} intervalId interval id
   */
  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }
  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;
  if (hot && allowToHot) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("App hot update...");
    if (typeof EventTarget !== "undefined" && (webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default()) instanceof EventTarget) {
      var event = new CustomEvent("webpackHotUpdate", {
        detail: {
          currentHash: currentStatus.currentHash
        },
        bubbles: true,
        cancelable: false
      });
      webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().dispatchEvent(event);
    } else {
      webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", currentStatus.currentHash);
    }
    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(currentStatus.currentHash), "*");
    }
  }
  // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    /** @type {Window} */
    var rootWindow = self;

    // use parent window for reload (in case we're in an iframe with no valid src)
    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;
        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
};
var ansiRegex = new RegExp(["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|"), "g");

/**
 * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.
 * Adapted from code originally released by Sindre Sorhus
 * Licensed the MIT License
 * @param {string} string string
 * @returns {string} string without ansi
 */
var stripAnsi = function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a `string`, got `".concat(_typeof(string), "`"));
  }
  return string.replace(ansiRegex, "");
};
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }
    options.hot = true;
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }
    options.liveReload = true;
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("App updated. Recompiling...");

    // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Invalid");
  },
  /**
   * @param {string} hash hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,
  /**
   * @param {boolean} value overlay value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }
    options.overlay = value;
    decodeOverlayOptions(options.overlay);
  },
  /**
   * @param {number} value reconnect value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }
    options.reconnect = value;
  },
  /**
   * @param {boolean} value progress value
   */
  progress: function progress(value) {
    options.progress = value;
  },
  /**
   * @param {{ pluginName?: string, percent: string, msg: string }} data date with progress
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }
    if ((0,_progress_js__WEBPACK_IMPORTED_MODULE_6__.isProgressSupported)() && typeof options.progress === "string") {
      var progress = document.querySelector("wds-progress");
      if (!progress) {
        (0,_progress_js__WEBPACK_IMPORTED_MODULE_6__.defineProgressElement)();
        progress = document.createElement("wds-progress");
        document.body.appendChild(progress);
      }
      progress.setAttribute("progress", data.percent);
      progress.setAttribute("type", options.progress);
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("Nothing changed.");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Ok");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    reloadApp(options, status);
  },
  /**
   * @param {string} file changed file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  /**
   * @param {Error[]} warnings warnings
   * @param {{ preventReloading: boolean }=} params extra params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.warn("Warnings while compiling.");
    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_2__.formatProblem)("warning", error),
        header = _formatProblem.header,
        body = _formatProblem.body;
      return "".concat(header, "\n").concat(stripAnsi(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Warnings", printableWarnings);
    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.warn(printableWarnings[i]);
    }
    var overlayWarningsSetting = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;
    if (overlayWarningsSetting) {
      var warningsToDisplay = typeof overlayWarningsSetting === "function" ? _warnings.filter(overlayWarningsSetting) : _warnings;
      if (warningsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "warning",
          messages: _warnings
        });
      }
    }
    if (params && params.preventReloading) {
      return;
    }
    reloadApp(options, status);
  },
  /**
   * @param {Error[]} errors errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.error("Errors while compiling. Reload prevented.");
    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_2__.formatProblem)("error", error),
        header = _formatProblem2.header,
        body = _formatProblem2.body;
      return "".concat(header, "\n").concat(stripAnsi(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Errors", printableErrors);
    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.error(printableErrors[i]);
    }
    var overlayErrorsSettings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;
    if (overlayErrorsSettings) {
      var errorsToDisplay = typeof overlayErrorsSettings === "function" ? _errors.filter(overlayErrorsSettings) : _errors;
      if (errorsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "error",
          messages: _errors
        });
      }
    }
  },
  /**
   * @param {Error} error error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_4__.log.info("Disconnected!");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_5__["default"])("Close");
  }
};

/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL object URL
 * @returns {string} formatted url
 */
var formatURL = function formatURL(objURL) {
  var protocol = objURL.protocol || "";
  if (protocol && protocol.slice(-1) !== ":") {
    protocol += ":";
  }
  var auth = objURL.auth || "";
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }
  var host = "";
  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));
    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }
  var pathname = objURL.pathname || "";
  if (objURL.slashes) {
    host = "//".concat(host || "");
    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }
  var search = objURL.search || "";
  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }
  var hash = objURL.hash || "";
  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }
  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match matched string
   * @returns {string} encoded URI component
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
};

/**
 * @param {ParsedURL} parsedURL parsed URL
 * @returns {string} socket URL
 */
var createSocketURL = function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname;

  // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'
  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]";

  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384
  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }
  var socketURLProtocol = parsedURL.protocol || self.location.protocol;

  // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.
  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }
  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = "";

  // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them
  if (parsedURL.username) {
    socketURLAuth = parsedURL.username;

    // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.
    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  }

  // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided
  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;
  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  }

  // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.
  var socketURLPathname = "/ws";
  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }
  return formatURL({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
};
var socketURL = createSocketURL(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage, options.reconnect);


/***/ }),

/***/ 970:
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/modules/logger/tapable.js":
/*!**********************************************!*\
  !*** ./client-src/modules/logger/tapable.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __nested_webpack_exports__, __nested_webpack_require_372__) {

__nested_webpack_require_372__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_372__.d(__nested_webpack_exports__, {
/* harmony export */   SyncBailHook: function() { return /* binding */ SyncBailHook; }
/* harmony export */ });
/**
 * @returns {SyncBailHook} mocked sync bail hook
 * @constructor
 */
function SyncBailHook() {
  return {
    call: function call() {}
  };
}

/**
 * Client stub for tapable SyncBailHook
 */


/***/ }),

/***/ "./node_modules/webpack/lib/logging/Logger.js":
/*!****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/Logger.js ***!
  \****************************************************/
/***/ (function(module) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) && "symbol" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) && o.constructor === (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) && o !== (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _iterableToArray(r) {
  if ("undefined" != typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) && null != r[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var LogType = Object.freeze({
  error: (/** @type {"error"} */"error"),
  // message, c style arguments
  warn: (/** @type {"warn"} */"warn"),
  // message, c style arguments
  info: (/** @type {"info"} */"info"),
  // message, c style arguments
  log: (/** @type {"log"} */"log"),
  // message, c style arguments
  debug: (/** @type {"debug"} */"debug"),
  // message, c style arguments

  trace: (/** @type {"trace"} */"trace"),
  // no arguments

  group: (/** @type {"group"} */"group"),
  // [label]
  groupCollapsed: (/** @type {"groupCollapsed"} */"groupCollapsed"),
  // [label]
  groupEnd: (/** @type {"groupEnd"} */"groupEnd"),
  // [label]

  profile: (/** @type {"profile"} */"profile"),
  // [profileName]
  profileEnd: (/** @type {"profileEnd"} */"profileEnd"),
  // [profileName]

  time: (/** @type {"time"} */"time"),
  // name, time as [seconds, nanoseconds]

  clear: (/** @type {"clear"} */"clear"),
  // no arguments
  status: (/** @type {"status"} */"status") // message, arguments
});
module.exports.LogType = LogType;

/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger raw log method");
var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger times");
var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger aggregated times");

/** @typedef {EXPECTED_ANY[]} Args */
var WebpackLogger = /*#__PURE__*/function () {
  /**
   * @param {(type: LogTypeEnum, args?: Args) => void} log log function
   * @param {(name: string | (() => string)) => WebpackLogger} getChildLogger function to create child logger
   */
  function WebpackLogger(log, getChildLogger) {
    _classCallCheck(this, WebpackLogger);
    this[LOG_SYMBOL] = log;
    this.getChildLogger = getChildLogger;
  }

  /**
   * @param {Args} args args
   */
  return _createClass(WebpackLogger, [{
    key: "error",
    value: function error() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      this[LOG_SYMBOL](LogType.error, args);
    }

    /**
     * @param {Args} args args
     */
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      this[LOG_SYMBOL](LogType.warn, args);
    }

    /**
     * @param {Args} args args
     */
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      this[LOG_SYMBOL](LogType.info, args);
    }

    /**
     * @param {Args} args args
     */
  }, {
    key: "log",
    value: function log() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      this[LOG_SYMBOL](LogType.log, args);
    }

    /**
     * @param {Args} args args
     */
  }, {
    key: "debug",
    value: function debug() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      this[LOG_SYMBOL](LogType.debug, args);
    }

    /**
     * @param {EXPECTED_ANY} assertion assertion
     * @param {Args} args args
     */
  }, {
    key: "assert",
    value: function assert(assertion) {
      if (!assertion) {
        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }
        this[LOG_SYMBOL](LogType.error, args);
      }
    }
  }, {
    key: "trace",
    value: function trace() {
      this[LOG_SYMBOL](LogType.trace, ["Trace"]);
    }
  }, {
    key: "clear",
    value: function clear() {
      this[LOG_SYMBOL](LogType.clear);
    }

    /**
     * @param {Args} args args
     */
  }, {
    key: "status",
    value: function status() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      this[LOG_SYMBOL](LogType.status, args);
    }

    /**
     * @param {Args} args args
     */
  }, {
    key: "group",
    value: function group() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      this[LOG_SYMBOL](LogType.group, args);
    }

    /**
     * @param {Args} args args
     */
  }, {
    key: "groupCollapsed",
    value: function groupCollapsed() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      this[LOG_SYMBOL](LogType.groupCollapsed, args);
    }
  }, {
    key: "groupEnd",
    value: function groupEnd() {
      this[LOG_SYMBOL](LogType.groupEnd);
    }

    /**
     * @param {string=} label label
     */
  }, {
    key: "profile",
    value: function profile(label) {
      this[LOG_SYMBOL](LogType.profile, [label]);
    }

    /**
     * @param {string=} label label
     */
  }, {
    key: "profileEnd",
    value: function profileEnd(label) {
      this[LOG_SYMBOL](LogType.profileEnd, [label]);
    }

    /**
     * @param {string} label label
     */
  }, {
    key: "time",
    value: function time(label) {
      /** @type {Map<string | undefined, [number, number]>} */
      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
      this[TIMERS_SYMBOL].set(label, process.hrtime());
    }

    /**
     * @param {string=} label label
     */
  }, {
    key: "timeLog",
    value: function timeLog(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
      }
      var time = process.hrtime(prev);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }

    /**
     * @param {string=} label label
     */
  }, {
    key: "timeEnd",
    value: function timeEnd(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
      }
      var time = process.hrtime(prev);
      /** @type {Map<string | undefined, [number, number]>} */
      this[TIMERS_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }

    /**
     * @param {string=} label label
     */
  }, {
    key: "timeAggregate",
    value: function timeAggregate(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
      }
      var time = process.hrtime(prev);
      /** @type {Map<string | undefined, [number, number]>} */
      this[TIMERS_SYMBOL].delete(label);
      /** @type {Map<string | undefined, [number, number]>} */
      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (current !== undefined) {
        if (time[1] + current[1] > 1e9) {
          time[0] += current[0] + 1;
          time[1] = time[1] - 1e9 + current[1];
        } else {
          time[0] += current[0];
          time[1] += current[1];
        }
      }
      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
    }

    /**
     * @param {string=} label label
     */
  }, {
    key: "timeAggregateEnd",
    value: function timeAggregateEnd(label) {
      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (time === undefined) return;
      this[TIMERS_AGGREGATES_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }]);
}();
module.exports.Logger = WebpackLogger;

/***/ }),

/***/ "./node_modules/webpack/lib/logging/createConsoleLogger.js":
/*!*****************************************************************!*\
  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_12749__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) && r[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _iterableToArray(r) {
  if ("undefined" != typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) && null != r[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) && "symbol" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) && o.constructor === (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) && o !== (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
var _require = __nested_webpack_require_12749__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
  LogType = _require.LogType;

/** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */
/** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */
/** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */
/** @typedef {import("./Logger").Args} Args */

/** @typedef {(item: string) => boolean} FilterFunction */
/** @typedef {(value: string, type: LogTypeEnum, args?: Args) => void} LoggingFunction */

/**
 * @typedef {object} LoggerConsole
 * @property {() => void} clear
 * @property {() => void} trace
 * @property {(...args: Args) => void} info
 * @property {(...args: Args) => void} log
 * @property {(...args: Args) => void} warn
 * @property {(...args: Args) => void} error
 * @property {(...args: Args) => void=} debug
 * @property {(...args: Args) => void=} group
 * @property {(...args: Args) => void=} groupCollapsed
 * @property {(...args: Args) => void=} groupEnd
 * @property {(...args: Args) => void=} status
 * @property {(...args: Args) => void=} profile
 * @property {(...args: Args) => void=} profileEnd
 * @property {(...args: Args) => void=} logTime
 */

/**
 * @typedef {object} LoggerOptions
 * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
 * @property {FilterTypes|boolean} debug filter for debug logging
 * @property {LoggerConsole} console the console to log to
 */

/**
 * @param {FilterItemTypes} item an input item
 * @returns {FilterFunction | undefined} filter function
 */
var filterToFunction = function filterToFunction(item) {
  if (typeof item === "string") {
    var regExp = new RegExp("[\\\\/]".concat(item.replace(/[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
    return function (ident) {
      return regExp.test(ident);
    };
  }
  if (item && _typeof(item) === "object" && typeof item.test === "function") {
    return function (ident) {
      return item.test(ident);
    };
  }
  if (typeof item === "function") {
    return item;
  }
  if (typeof item === "boolean") {
    return function () {
      return item;
    };
  }
};

/**
 * @enum {number}
 */
var LogLevel = {
  none: 6,
  false: 6,
  error: 5,
  warn: 4,
  info: 3,
  log: 2,
  true: 2,
  verbose: 1
};

/**
 * @param {LoggerOptions} options options object
 * @returns {LoggingFunction} logging function
 */
module.exports = function (_ref) {
  var _ref$level = _ref.level,
    level = _ref$level === void 0 ? "info" : _ref$level,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug,
    console = _ref.console;
  var debugFilters = /** @type {FilterFunction[]} */

  typeof debug === "boolean" ? [function () {
    return debug;
  }] : /** @type {FilterItemTypes[]} */_toConsumableArray(Array.isArray(debug) ? debug : [debug]).map(filterToFunction);
  var loglevel = LogLevel["".concat(level)] || 0;

  /**
   * @param {string} name name of the logger
   * @param {LogTypeEnum} type type of the log entry
   * @param {Args=} args arguments of the log entry
   * @returns {void}
   */
  var logger = function logger(name, type, args) {
    var labeledArgs = function labeledArgs() {
      if (Array.isArray(args)) {
        if (args.length > 0 && typeof args[0] === "string") {
          return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
        }
        return ["[".concat(name, "]")].concat(_toConsumableArray(args));
      }
      return [];
    };
    var debug = debugFilters.some(function (f) {
      return f(name);
    });
    switch (type) {
      case LogType.debug:
        if (!debug) return;
        if (typeof console.debug === "function") {
          console.debug.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.log:
        if (!debug && loglevel > LogLevel.log) return;
        console.log.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.info:
        if (!debug && loglevel > LogLevel.info) return;
        console.info.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.warn:
        if (!debug && loglevel > LogLevel.warn) return;
        console.warn.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.error:
        if (!debug && loglevel > LogLevel.error) return;
        console.error.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.trace:
        if (!debug) return;
        console.trace();
        break;
      case LogType.groupCollapsed:
        if (!debug && loglevel > LogLevel.log) return;
        if (!debug && loglevel > LogLevel.verbose) {
          if (typeof console.groupCollapsed === "function") {
            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
          } else {
            console.log.apply(console, _toConsumableArray(labeledArgs()));
          }
          break;
        }
      // falls through
      case LogType.group:
        if (!debug && loglevel > LogLevel.log) return;
        if (typeof console.group === "function") {
          console.group.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.groupEnd:
        if (!debug && loglevel > LogLevel.log) return;
        if (typeof console.groupEnd === "function") {
          console.groupEnd();
        }
        break;
      case LogType.time:
        {
          if (!debug && loglevel > LogLevel.log) return;
          var _args = _slicedToArray(/** @type {[string, number, number]} */
            args, 3),
            label = _args[0],
            start = _args[1],
            end = _args[2];
          var ms = start * 1000 + end / 1000000;
          var msg = "[".concat(name, "] ").concat(label, ": ").concat(ms, " ms");
          if (typeof console.logTime === "function") {
            console.logTime(msg);
          } else {
            console.log(msg);
          }
          break;
        }
      case LogType.profile:
        if (typeof console.profile === "function") {
          console.profile.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.profileEnd:
        if (typeof console.profileEnd === "function") {
          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.clear:
        if (!debug && loglevel > LogLevel.log) return;
        if (typeof console.clear === "function") {
          console.clear();
        }
        break;
      case LogType.status:
        if (!debug && loglevel > LogLevel.info) return;
        if (typeof console.status === "function") {
          if (!args || args.length === 0) {
            console.status();
          } else {
            console.status.apply(console, _toConsumableArray(labeledArgs()));
          }
        } else if (args && args.length !== 0) {
          console.info.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      default:
        throw new Error("Unexpected LogType ".concat(type));
    }
  };
  return logger;
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/runtime.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_23673__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
var _require = __nested_webpack_require_23673__(/*! tapable */ "./client-src/modules/logger/tapable.js"),
  SyncBailHook = _require.SyncBailHook;
var _require2 = __nested_webpack_require_23673__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
  Logger = _require2.Logger;
var createConsoleLogger = __nested_webpack_require_23673__(/*! ./createConsoleLogger */ "./node_modules/webpack/lib/logging/createConsoleLogger.js");

/** @type {createConsoleLogger.LoggerOptions} */
var currentDefaultLoggerOptions = {
  level: "info",
  debug: false,
  console: console
};
var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);

/**
 * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
 * @returns {void}
 */
module.exports.configureDefaultLogger = function (options) {
  _extends(currentDefaultLoggerOptions, options);
  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
};

/**
 * @param {string} name name of the logger
 * @returns {Logger} a logger
 */
module.exports.getLogger = function (name) {
  return new Logger(function (type, args) {
    if (module.exports.hooks.log.call(name, type, args) === undefined) {
      currentDefaultLogger(name, type, args);
    }
  }, function (childName) {
    return module.exports.getLogger("".concat(name, "/").concat(childName));
  });
};
module.exports.hooks = {
  log: new SyncBailHook(["origin", "type", "args"])
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_25750__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_25750__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_25750__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_25750__.o(definition, key) && !__nested_webpack_require_25750__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_25750__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_25750__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __nested_webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
/*!********************************************!*\
  !*** ./client-src/modules/logger/index.js ***!
  \********************************************/
__nested_webpack_require_25750__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_25750__.d(__nested_webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }
/* harmony export */ });
/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_25750__(/*! webpack/lib/logging/runtime.js */ "./node_modules/webpack/lib/logging/runtime.js");
// @ts-expect-error

}();
var __webpack_export_target__ = exports;
for(var __webpack_i__ in __nested_webpack_exports__) __webpack_export_target__[__webpack_i__] = __nested_webpack_exports__[__webpack_i__];
if(__nested_webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ 887:
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createOverlay: () => (/* binding */ createOverlay),
/* harmony export */   formatProblem: () => (/* binding */ formatProblem)
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ 223);
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).



/** @typedef {import("./index").EXPECTED_ANY} EXPECTED_ANY */

/**
 * @type {(input: string, position: number) => number | undefined}
 */
// @ts-expect-error
var getCodePoint = String.prototype.codePointAt ?
// @ts-expect-error
function (input, position) {
  return input.codePointAt(position);
} : function (input, position) {
  return (input.charCodeAt(position) - 0xd800) * 0x400 + input.charCodeAt(position + 1) - 0xdc00 + 0x10000;
};

/**
 * @param {string} macroText macro text
 * @param {RegExp} macroRegExp macro reg exp
 * @param {(input: string) => string} macroReplacer macro replacer
 * @returns {string} result
 */
var replaceUsingRegExp = function replaceUsingRegExp(macroText, macroRegExp, macroReplacer) {
  macroRegExp.lastIndex = 0;
  var replaceMatch = macroRegExp.exec(macroText);
  var replaceResult;
  if (replaceMatch) {
    replaceResult = "";
    var replaceLastIndex = 0;
    do {
      if (replaceLastIndex !== replaceMatch.index) {
        replaceResult += macroText.slice(replaceLastIndex, replaceMatch.index);
      }
      var replaceInput = replaceMatch[0];
      replaceResult += macroReplacer(replaceInput);
      replaceLastIndex = replaceMatch.index + replaceInput.length;
    } while (replaceMatch = macroRegExp.exec(macroText));
    if (replaceLastIndex !== macroText.length) {
      replaceResult += macroText.slice(replaceLastIndex);
    }
  } else {
    replaceResult = macroText;
  }
  return replaceResult;
};
var references = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
  "&": "&amp;"
};

/**
 * @param {string} text text
 * @returns {string} encoded text
 */
function encode(text) {
  if (!text) {
    return "";
  }
  return replaceUsingRegExp(text, /[<>'"&]/g, function (input) {
    var result = references[(/** @type {keyof typeof references} */input)];
    if (!result) {
      var code = input.length > 1 ? getCodePoint(input, 0) : input.charCodeAt(0);
      result = "&#".concat(code, ";");
    }
    return result;
  });
}

/**
 * @typedef {object} Context
 * @property {'warning' | 'error'} level level
 * @property {(string  | Message)[]} messages messages
 * @property {'build' | 'runtime'} messageSource message source
 */

/** @typedef {{ type: string } & Record<string, EXPECTED_ANY>} Event */

/**
 * @typedef {object} Options
 * @property {{ [state: string]: { on: Record<string, { target: string; actions?: Array<string> }> } }} states states
 * @property {Context} context context
 * @property {string} initial initial
 */

/**
 * @typedef {object} Implementation
 * @property {{ [actionName: string]: (ctx: Context, event: Event) => Context | void }} actions actions
 */

/**
 * @typedef {{ send: (event: Event) => void }} StateMachine
 */

/**
 * A simplified `createMachine` from `@xstate/fsm` with the following differences:
 * - the returned machine is technically a "service". No `interpret(machine).start()` is needed.
 * - the state definition only support `on` and target must be declared with { target: 'nextState', actions: [] } explicitly.
 * - event passed to `send` must be an object with `type` property.
 * - actions implementation will be [assign action](https://xstate.js.org/docs/guides/context.html#assign-action) if you return any value.
 * Do not return anything if you just want to invoke side effect.
 *
 * The goal of this custom function is to avoid installing the entire `'xstate/fsm'` package, while enabling modeling using
 * state machine. You can copy the first parameter into the editor at https://stately.ai/viz to visualize the state machine.
 * @param {Options} options options
 * @param {Implementation} implementation implementation
 * @returns {StateMachine} state machine
 */
function createMachine(_ref, _ref2) {
  var states = _ref.states,
    context = _ref.context,
    initial = _ref.initial;
  var actions = _ref2.actions;
  var currentState = initial;
  var currentContext = context;
  return {
    send: function send(event) {
      var currentStateOn = states[currentState].on;
      var transitionConfig = currentStateOn && currentStateOn[event.type];
      if (transitionConfig) {
        currentState = transitionConfig.target;
        if (transitionConfig.actions) {
          transitionConfig.actions.forEach(function (actName) {
            var actionImpl = actions[actName];
            var nextContextValue = actionImpl && actionImpl(currentContext, event);
            if (nextContextValue) {
              currentContext = _objectSpread(_objectSpread({}, currentContext), nextContextValue);
            }
          });
        }
      }
    }
  };
}

/**
 * @typedef {object} ShowOverlayData
 * @property {'warning' | 'error'} level level
 * @property {(string  | Message)[]} messages messages
 * @property {'build' | 'runtime'} messageSource message source
 */

/**
 * @typedef {object} CreateOverlayMachineOptions
 * @property {(data: ShowOverlayData) => void} showOverlay show overlay
 * @property {() => void} hideOverlay hide overlay
 */

/**
 * @param {CreateOverlayMachineOptions} options options
 * @returns {StateMachine} state machine
 */
var createOverlayMachine = function createOverlayMachine(options) {
  var hideOverlay = options.hideOverlay,
    showOverlay = options.showOverlay;
  return createMachine({
    initial: "hidden",
    context: {
      level: "error",
      messages: [],
      messageSource: "build"
    },
    states: {
      hidden: {
        on: {
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      },
      displayBuildError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["appendMessages", "showOverlay"]
          }
        }
      },
      displayRuntimeError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["appendMessages", "showOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      }
    }
  }, {
    actions: {
      dismissMessages: function dismissMessages() {
        return {
          messages: [],
          level: "error",
          messageSource: "build"
        };
      },
      appendMessages: function appendMessages(context, event) {
        return {
          messages: context.messages.concat(event.messages),
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      setMessages: function setMessages(context, event) {
        return {
          messages: event.messages,
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      hideOverlay: hideOverlay,
      showOverlay: showOverlay
    }
  });
};

/**
 * @param {Error} error error
 * @returns {undefined | string[]} stack
 */
var parseErrorToStacks = function parseErrorToStacks(error) {
  if (!error || !(error instanceof Error)) {
    throw new Error("parseErrorToStacks expects Error object");
  }
  if (typeof error.stack === "string") {
    return error.stack.split("\n").filter(function (stack) {
      return stack !== "Error: ".concat(error.message);
    });
  }
};

/**
 * @callback ErrorCallback
 * @param {ErrorEvent} error
 * @returns {void}
 */

/**
 * @param {ErrorCallback} callback callback
 * @returns {() => void} cleanup
 */
var listenToRuntimeError = function listenToRuntimeError(callback) {
  window.addEventListener("error", callback);
  return function cleanup() {
    window.removeEventListener("error", callback);
  };
};

/**
 * @callback UnhandledRejectionCallback
 * @param {PromiseRejectionEvent} rejectionEvent
 * @returns {void}
 */

/**
 * @param {UnhandledRejectionCallback} callback callback
 * @returns {() => void} cleanup
 */
var listenToUnhandledRejection = function listenToUnhandledRejection(callback) {
  window.addEventListener("unhandledrejection", callback);
  return function cleanup() {
    window.removeEventListener("unhandledrejection", callback);
  };
};

// Styles are inspired by `react-error-overlay`

var msgStyles = {
  error: {
    backgroundColor: "rgba(206, 17, 38, 0.1)",
    color: "#fccfcf"
  },
  warning: {
    backgroundColor: "rgba(251, 245, 180, 0.1)",
    color: "#fbf5b4"
  }
};
var iframeStyle = {
  position: "fixed",
  top: "0px",
  left: "0px",
  right: "0px",
  bottom: "0px",
  width: "100vw",
  height: "100vh",
  border: "none",
  "z-index": 9999999999
};
var containerStyle = {
  position: "fixed",
  boxSizing: "border-box",
  left: "0px",
  top: "0px",
  right: "0px",
  bottom: "0px",
  width: "100vw",
  height: "100vh",
  fontSize: "large",
  padding: "2rem 2rem 4rem 2rem",
  lineHeight: "1.2",
  whiteSpace: "pre-wrap",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  color: "white"
};
var headerStyle = {
  color: "#e83b46",
  fontSize: "2em",
  whiteSpace: "pre-wrap",
  fontFamily: "sans-serif",
  margin: "0 2rem 2rem 0",
  flex: "0 0 auto",
  maxHeight: "50%",
  overflow: "auto"
};
var dismissButtonStyle = {
  color: "#ffffff",
  lineHeight: "1rem",
  fontSize: "1.5rem",
  padding: "1rem",
  cursor: "pointer",
  position: "absolute",
  right: "0px",
  top: "0px",
  backgroundColor: "transparent",
  border: "none"
};
var msgTypeStyle = {
  color: "#e83b46",
  fontSize: "1.2em",
  marginBottom: "1rem",
  fontFamily: "sans-serif"
};
var msgTextStyle = {
  lineHeight: "1.5",
  fontSize: "1rem",
  fontFamily: "Menlo, Consolas, monospace"
};

// ANSI HTML

var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

/** @typedef {Error & { file?: string, moduleName?: string, moduleIdentifier?: string, loc?: string, message?: string; stack?: string | string[] }} Message */

/**
 * @param {string} type type
 * @param {string | Message} item item
 * @returns {{ header: string, body: string }} formatted problem
 */
var formatProblem = function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";
  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || "";
    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }
  if (typeof item !== "string" && Array.isArray(item.stack)) {
    item.stack.forEach(function (stack) {
      if (typeof stack === "string") {
        body += "\r\n".concat(stack);
      }
    });
  }
  return {
    header: header,
    body: body
  };
};

/**
 * @typedef {object} CreateOverlayOptions
 * @property {(false | string)=} trustedTypesPolicyName trusted types policy name
 * @property {(boolean | ((error: Error) => void))=} catchRuntimeError runtime error catcher
 */

/**
 * @param {CreateOverlayOptions} options options
 * @returns {StateMachine} overlay
 */
var createOverlay = function createOverlay(options) {
  /** @type {HTMLIFrameElement | null | undefined} */
  var iframeContainerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var containerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var headerElement;
  /** @type {Array<(element: HTMLDivElement) => void>} */
  var onLoadQueue = [];
  /** @type {Omit<TrustedTypePolicy, "createScript" | "createScriptURL"> | undefined} */
  var overlayTrustedTypesPolicy;

  /** @typedef {Extract<keyof CSSStyleDeclaration, "string">} CSSStyleDeclarationKeys */

  /**
   * @param {HTMLElement} element element
   * @param {Partial<CSSStyleDeclaration>} style style
   */
  function applyStyle(element, style) {
    Object.keys(style).forEach(function (prop) {
      element.style[(/** @type {CSSStyleDeclarationKeys} */prop)] = /** @type {string} */
      style[(/** @type {CSSStyleDeclarationKeys} */prop)];
    });
  }

  /**
   * @param {string | false | undefined} trustedTypesPolicyName trusted types police name
   */
  function createContainer(trustedTypesPolicyName) {
    // Enable Trusted Types if they are available in the current browser.
    if (window.trustedTypes) {
      overlayTrustedTypesPolicy = window.trustedTypes.createPolicy(trustedTypesPolicyName || "webpack-dev-server#overlay", {
        createHTML: function createHTML(value) {
          return value;
        }
      });
    }
    iframeContainerElement = document.createElement("iframe");
    iframeContainerElement.id = "webpack-dev-server-client-overlay";
    iframeContainerElement.src = "about:blank";
    applyStyle(iframeContainerElement, iframeStyle);
    iframeContainerElement.onload = function () {
      var contentElement = /** @type {Document} */
      (/** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).createElement("div");
      containerElement = /** @type {Document} */
      (/** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).createElement("div");
      contentElement.id = "webpack-dev-server-client-overlay-div";
      applyStyle(contentElement, containerStyle);
      headerElement = document.createElement("div");
      headerElement.innerText = "Compiled with problems:";
      applyStyle(headerElement, headerStyle);
      var closeButtonElement = document.createElement("button");
      applyStyle(closeButtonElement, dismissButtonStyle);
      closeButtonElement.innerText = "×";
      closeButtonElement.ariaLabel = "Dismiss";
      closeButtonElement.addEventListener("click", function () {
        // eslint-disable-next-line no-use-before-define
        overlayService.send({
          type: "DISMISS"
        });
      });
      contentElement.appendChild(headerElement);
      contentElement.appendChild(closeButtonElement);
      contentElement.appendChild(containerElement);

      /** @type {Document} */
      (/** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument).body.appendChild(contentElement);
      onLoadQueue.forEach(function (onLoad) {
        onLoad(/** @type {HTMLDivElement} */contentElement);
      });
      onLoadQueue = [];

      /** @type {HTMLIFrameElement} */
      iframeContainerElement.onload = null;
    };
    document.body.appendChild(iframeContainerElement);
  }

  /**
   * @param {(element: HTMLDivElement) => void} callback callback
   * @param {string | false | undefined} trustedTypesPolicyName trusted types policy name
   */
  function ensureOverlayExists(callback, trustedTypesPolicyName) {
    if (containerElement) {
      // @ts-expect-error https://github.com/microsoft/TypeScript/issues/30024
      containerElement.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML("") : "";
      // Everything is ready, call the callback right away.
      callback(containerElement);
      return;
    }
    onLoadQueue.push(callback);
    if (iframeContainerElement) {
      return;
    }
    createContainer(trustedTypesPolicyName);
  }

  // Successful compilation.
  /**
   * @returns {void}
   */
  function hide() {
    if (!iframeContainerElement) {
      return;
    }

    // Clean up and reset internal state.
    document.body.removeChild(iframeContainerElement);
    iframeContainerElement = null;
    containerElement = null;
  }

  // Compilation with errors (e.g. syntax error or missing modules).
  /**
   * @param {string} type type
   * @param {(string | Message)[]} messages messages
   * @param {undefined | false | string} trustedTypesPolicyName trusted types policy name
   * @param {'build' | 'runtime'} messageSource message source
   */
  function show(type, messages, trustedTypesPolicyName, messageSource) {
    ensureOverlayExists(function () {
      /** @type {HTMLDivElement} */
      headerElement.innerText = messageSource === "runtime" ? "Uncaught runtime errors:" : "Compiled with problems:";
      messages.forEach(function (message) {
        var entryElement = document.createElement("div");
        var msgStyle = type === "warning" ? msgStyles.warning : msgStyles.error;
        applyStyle(entryElement, _objectSpread(_objectSpread({}, msgStyle), {}, {
          padding: "1rem 1rem 1.5rem 1rem"
        }));
        var typeElement = document.createElement("div");
        var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;
        typeElement.innerText = header;
        applyStyle(typeElement, msgTypeStyle);
        if (typeof message !== "string" && message.moduleIdentifier) {
          applyStyle(typeElement, {
            cursor: "pointer"
          });
          // element.dataset not supported in IE
          typeElement.setAttribute("data-can-open", "true");
          typeElement.addEventListener("click", function () {
            fetch("/webpack-dev-server/open-editor?fileName=".concat(message.moduleIdentifier));
          });
        }

        // Make it look similar to our terminal.
        var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()(encode(body));
        var messageTextNode = document.createElement("div");
        applyStyle(messageTextNode, msgTextStyle);

        // @ts-expect-error https://github.com/microsoft/TypeScript/issues/30024
        messageTextNode.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(text) : text;
        entryElement.appendChild(typeElement);
        entryElement.appendChild(messageTextNode);

        /** @type {HTMLDivElement} */
        containerElement.appendChild(entryElement);
      });
    }, trustedTypesPolicyName);
  }

  /** @type {(event: KeyboardEvent) => void} */
  var handleEscapeKey;

  /**
   * @returns {void}
   */

  var hideOverlayWithEscCleanup = function hideOverlayWithEscCleanup() {
    window.removeEventListener("keydown", handleEscapeKey);
    hide();
  };
  var overlayService = createOverlayMachine({
    showOverlay: function showOverlay(_ref3) {
      var _ref3$level = _ref3.level,
        level = _ref3$level === void 0 ? "error" : _ref3$level,
        messages = _ref3.messages,
        messageSource = _ref3.messageSource;
      return show(level, messages, options.trustedTypesPolicyName, messageSource);
    },
    hideOverlay: hideOverlayWithEscCleanup
  });
  /**
   * ESC key press to dismiss the overlay.
   * @param {KeyboardEvent} event Keydown event
   */
  handleEscapeKey = function handleEscapeKey(event) {
    if (event.key === "Escape" || event.key === "Esc" || event.keyCode === 27) {
      overlayService.send({
        type: "DISMISS"
      });
    }
  };
  window.addEventListener("keydown", handleEscapeKey);
  if (options.catchRuntimeError) {
    /**
     * @param {Error | undefined} error error
     * @param {string} fallbackMessage fallback message
     */
    var handleError = function handleError(error, fallbackMessage) {
      var errorObject = error instanceof Error ? error : new Error(error || fallbackMessage, {
        cause: error
      });
      var shouldDisplay = typeof options.catchRuntimeError === "function" ? options.catchRuntimeError(errorObject) : true;
      if (shouldDisplay) {
        overlayService.send({
          type: "RUNTIME_ERROR",
          messages: [{
            message: errorObject.message,
            stack: parseErrorToStacks(errorObject)
          }]
        });
      }
    };
    listenToRuntimeError(function (errorEvent) {
      // error property may be empty in older browser like IE
      var error = errorEvent.error,
        message = errorEvent.message;
      if (!error && !message) {
        return;
      }

      // if error stack indicates a React error boundary caught the error, do not show overlay.
      if (error && error.stack && error.stack.includes("invokeGuardedCallbackDev")) {
        return;
      }
      handleError(error, message);
    });
    listenToUnhandledRejection(function (promiseRejectionEvent) {
      var reason = promiseRejectionEvent.reason;
      handleError(reason, "Unknown promise rejection reason");
    });
  }
  return overlayService;
};


/***/ }),

/***/ 40:
/*!************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/progress.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defineProgressElement: () => (/* binding */ defineProgressElement),
/* harmony export */   isProgressSupported: () => (/* binding */ isProgressSupported)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
/**
 * @returns {boolean} true when custom elements supported, otherwise false
 */
function isProgressSupported() {
  return "customElements" in self && Boolean(HTMLElement.prototype.attachShadow);
}

/**
 * @returns {void}
 */
function defineProgressElement() {
  var _WebpackDevServerProgress;
  if (customElements.get("wds-progress")) {
    return;
  }
  var _WebpackDevServerProgress_brand = /*#__PURE__*/new WeakSet();
  var WebpackDevServerProgress = /*#__PURE__*/function (_HTMLElement) {
    function WebpackDevServerProgress() {
      var _this;
      _classCallCheck(this, WebpackDevServerProgress);
      _this = _callSuper(this, WebpackDevServerProgress);
      _classPrivateMethodInitSpec(_this, _WebpackDevServerProgress_brand);
      _this.attachShadow({
        mode: "open"
      });
      _this.maxDashOffset = -219.99078369140625;
      _this.animationTimer = null;
      return _this;
    }
    _inherits(WebpackDevServerProgress, _HTMLElement);
    return _createClass(WebpackDevServerProgress, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        _assertClassBrand(_WebpackDevServerProgress_brand, this, _reset).call(this);
      }
    }, {
      key: "attributeChangedCallback",
      value:
      /**
       * @param {string} name name
       * @param {string} oldValue old value
       * @param {string} newValue new value
       */
      function attributeChangedCallback(name, oldValue, newValue) {
        if (name === "progress") {
          _assertClassBrand(_WebpackDevServerProgress_brand, this, _update).call(this, Number(newValue));
        } else if (name === "type") {
          _assertClassBrand(_WebpackDevServerProgress_brand, this, _reset).call(this);
        }
      }

      /**
       * @param {number} percent percent
       */
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ["progress", "type"];
      }
    }]);
  }(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
  _WebpackDevServerProgress = WebpackDevServerProgress;
  function _reset() {
    var _this$getAttribute;
    clearTimeout(this.animationTimer);
    this.animationTimer = null;
    var typeAttr = (_this$getAttribute = this.getAttribute("type")) === null || _this$getAttribute === void 0 ? void 0 : _this$getAttribute.toLowerCase();
    this.type = typeAttr === "circular" ? "circular" : "linear";
    var innerHTML = this.type === "circular" ? _circularTemplate.call(_WebpackDevServerProgress) : _linearTemplate.call(_WebpackDevServerProgress);
    /** @type {ShadowRoot} */
    this.shadowRoot.innerHTML = innerHTML;
    var progressValue = this.getAttribute("progress");
    this.initialProgress = progressValue ? Number(progressValue) : 0;
    _assertClassBrand(_WebpackDevServerProgress_brand, this, _update).call(this, this.initialProgress);
  }
  function _circularTemplate() {
    return "\n        <style>\n        :host {\n            width: 200px;\n            height: 200px;\n            position: fixed;\n            right: 5%;\n            top: 5%;\n            pointer-events: none;\n            transition: opacity .25s ease-in-out;\n            z-index: 2147483645;\n        }\n\n        circle {\n            fill: #282d35;\n        }\n\n        path {\n            fill: rgba(0, 0, 0, 0);\n            stroke: rgb(186, 223, 172);\n            stroke-dasharray: 219.99078369140625;\n            stroke-dashoffset: -219.99078369140625;\n            stroke-width: 10;\n            transform: rotate(90deg) translate(0px, -80px);\n        }\n\n        text {\n            font-family: 'Open Sans', sans-serif;\n            font-size: 18px;\n            fill: #ffffff;\n            dominant-baseline: middle;\n            text-anchor: middle;\n        }\n\n        tspan#percent-super {\n            fill: #bdc3c7;\n            font-size: 0.45em;\n            baseline-shift: 10%;\n        }\n\n        @keyframes fade {\n            0% { opacity: 1; transform: scale(1); }\n            100% { opacity: 0; transform: scale(0); }\n        }\n\n        .disappear {\n            animation: fade 0.3s;\n            animation-fill-mode: forwards;\n            animation-delay: 0.5s;\n        }\n\n        .hidden {\n            display: none;\n        }\n        </style>\n        <svg id=\"progress\" class=\"hidden noselect\" viewBox=\"0 0 80 80\">\n        <circle cx=\"50%\" cy=\"50%\" r=\"35\"></circle>\n        <path d=\"M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0\"></path>\n        <text x=\"50%\" y=\"51%\">\n            <tspan id=\"percent-value\">0</tspan>\n            <tspan id=\"percent-super\">%</tspan>\n        </text>\n        </svg>\n      ";
  }
  function _linearTemplate() {
    return "\n        <style>\n        :host {\n            position: fixed;\n            top: 0;\n            left: 0;\n            pointer-events: none;\n            height: 4px;\n            width: 100vw;\n            z-index: 2147483645;\n        }\n\n        #bar {\n            width: 0%;\n            height: 4px;\n            background-color: rgb(186, 223, 172);\n        }\n\n        @keyframes fade {\n            0% { opacity: 1; }\n            100% { opacity: 0; }\n        }\n\n        .disappear {\n            animation: fade 0.3s;\n            animation-fill-mode: forwards;\n            animation-delay: 0.5s;\n        }\n\n        .hidden {\n            display: none;\n        }\n        </style>\n        <div id=\"progress\"></div>\n        ";
  }
  function _update(percent) {
    var shadowRoot = /** @type {ShadowRoot} */this.shadowRoot;
    var element = /** @type {HTMLElement} */
    shadowRoot.querySelector("#progress");
    if (this.type === "circular") {
      var path = /** @type {SVGPathElement} */
      shadowRoot.querySelector("path");
      var value = /** @type {HTMLElement} */
      shadowRoot.querySelector("#percent-value");
      var offset = (100 - percent) / 100 * this.maxDashOffset;
      path.style.strokeDashoffset = String(offset);
      value.textContent = String(percent);
    } else {
      element.style.width = "".concat(percent, "%");
    }
    if (percent >= 100) {
      _assertClassBrand(_WebpackDevServerProgress_brand, this, _hide).call(this);
    } else if (percent > 0) {
      _assertClassBrand(_WebpackDevServerProgress_brand, this, _show).call(this);
    }
  }
  function _show() {
    var shadowRoot = /** @type {ShadowRoot} */this.shadowRoot;
    var element = /** @type {HTMLElement} */
    shadowRoot.querySelector("#progress");
    element.classList.remove("hidden");
  }
  function _hide() {
    var _this2 = this;
    var shadowRoot = /** @type {ShadowRoot} */this.shadowRoot;
    var element = /** @type {HTMLElement} */
    shadowRoot.querySelector("#progress");
    if (this.type === "circular") {
      element.classList.add("disappear");
      element.addEventListener("animationend", function () {
        element.classList.add("hidden");
        _assertClassBrand(_WebpackDevServerProgress_brand, _this2, _update).call(_this2, 0);
      }, {
        once: true
      });
    } else if (this.type === "linear") {
      element.classList.add("disappear");
      this.animationTimer = setTimeout(function () {
        element.classList.remove("disappear");
        element.classList.add("hidden");
        element.style.width = "0%";
        _this2.animationTimer = null;
      }, 800);
    }
  }
  customElements.define("wds-progress", WebpackDevServerProgress);
}

/***/ }),

/***/ 930:
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   client: () => (/* binding */ client),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ 976);
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ 43);
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ 976);
/* global __webpack_dev_server_client__ */




/** @typedef {import("./index.js").EXPECTED_ANY} EXPECTED_ANY */
/** @typedef {import("./clients/SockJSClient")} SockJSClient */

// this WebsocketClient is here as a default fallback, in case the client is not injected
/** @type {CommunicationClientConstructor} */
var Client = typeof __webpack_dev_server_client__ !== "undefined" ? typeof (/** @type {{ default: CommunicationClientConstructor }} */
__webpack_dev_server_client__.default) !== "undefined" ? /** @type {{ default: CommunicationClientConstructor }} */
__webpack_dev_server_client__.default : (/** @type {CommunicationClientConstructor} */
__webpack_dev_server_client__) : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
var retries = 0;
var maxRetries = 10;

// Initialized client is exported so external consumers can utilize the same instance
// It is mutable to enforce singleton
/** @type {CommunicationClient | null} */
// eslint-disable-next-line import/no-mutable-exports
var client = null;

/** @type {ReturnType<typeof setTimeout> | undefined} */
var timeout;

/**
 * @param {string} url url
 * @param {{ [handler: string]: (data?: EXPECTED_ANY, params?: EXPECTED_ANY) => EXPECTED_ANY }} handlers handlers
 * @param {number=} reconnect count of reconnections
 */
function socket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
    if (timeout) {
      clearTimeout(timeout);
    }
    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    }

    // Try to reconnect.
    client = null;

    // After 10 retries stop trying, to prevent logspam.
    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      timeout = setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {EXPECTED_ANY} data data
   */
  function (data) {
    var message = JSON.parse(data);
    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ }),

/***/ 43:
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   log: () => (/* binding */ log),
/* harmony export */   setLogLevel: () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ 970);
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server";
// default level is set on the client side, so it does not need
// to be set by the CLI or API
var defaultLevel = "info";

// options new options, merge with old options
/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level level
 * @returns {void}
 */
function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}
setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);


/***/ }),

/***/ 912:
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global WorkerGlobalScope */

/** @typedef {import("../index").EXPECTED_ANY} EXPECTED_ANY */

// Send messages to the outside, so plugins can consume it.
/**
 * @param {string} type type
 * @param {EXPECTED_ANY=} data data
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

/***/ }),

/***/ 826:
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __webpack_hash__ */
if (true) {
	/** @type {undefined|string} */
	var lastHash;
	var upToDate = function upToDate() {
		return /** @type {string} */ (lastHash).indexOf(__webpack_require__.h()) >= 0;
	};
	var log = __webpack_require__(/*! ./log */ 509);
	var check = function check() {
		module.hot
			.check(true)
			.then(function (updatedModules) {
				if (!updatedModules) {
					log(
						"warning",
						"[HMR] Cannot find update. " +
							(typeof window !== "undefined"
								? "Need to do a full reload!"
								: "Please reload manually!")
					);
					log(
						"warning",
						"[HMR] (Probably because of restarting the webpack-dev-server)"
					);
					if (typeof window !== "undefined") {
						window.location.reload();
					}
					return;
				}

				if (!upToDate()) {
					check();
				}

				__webpack_require__(/*! ./log-apply-result */ 616)(updatedModules, updatedModules);

				if (upToDate()) {
					log("info", "[HMR] App is up to date.");
				}
			})
			.catch(function (err) {
				var status = module.hot.status();
				if (["abort", "fail"].indexOf(status) >= 0) {
					log(
						"warning",
						"[HMR] Cannot apply update. " +
							(typeof window !== "undefined"
								? "Need to do a full reload!"
								: "Please reload manually!")
					);
					log("warning", "[HMR] " + log.formatError(err));
					if (typeof window !== "undefined") {
						window.location.reload();
					}
				} else {
					log("warning", "[HMR] Update failed: " + log.formatError(err));
				}
			});
	};
	var hotEmitter = __webpack_require__(/*! ./emitter */ 689);
	hotEmitter.on("webpackHotUpdate", function (currentHash) {
		lastHash = currentHash;
		if (!upToDate() && module.hot.status() === "idle") {
			log("info", "[HMR] Checking for updates on the server...");
			check();
		}
	});
	log("info", "[HMR] Waiting for update signal from WDS...");
} else {}


/***/ }),

/***/ 689:
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(/*! events */ 216);
module.exports = new EventEmitter();


/***/ }),

/***/ 616:
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ 509);

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),

/***/ 509:
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

/** @typedef {"info" | "warning" | "error"} LogLevel */

/** @type {LogLevel} */
var logLevel = "info";

function dummy() {}

/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

/**
 * @param {LogLevel} level log level
 */
module.exports.setLogLevel = function (level) {
	logLevel = level;
};

/**
 * @param {Error} err error
 * @returns {string} formatted error
 */
module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	}
	return stack;
};


/***/ }),

/***/ 676:
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__676__;

/***/ }),

/***/ 909:
/*!*************************************!*\
  !*** external "@microsoft/sp-http" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__909__;

/***/ }),

/***/ 877:
/*!**********************************************!*\
  !*** external "@microsoft/sp-property-pane" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__877__;

/***/ }),

/***/ 642:
/*!*********************************************!*\
  !*** external "@microsoft/sp-webpart-base" ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__642__;

/***/ }),

/***/ 800:
/*!***************************************************!*\
  !*** external "FormularioMaquinasWebPartStrings" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__800__;

/***/ }),

/***/ 959:
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__959__;

/***/ }),

/***/ 398:
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__398__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("formulario-maquinas-web-part." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("e484c8e271a6ac18efc7")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "a6b61804-85fc-43d3-8837-8a99fb111bda_0.0.1:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 				if (script.src.indexOf(window.location.origin + '/') !== 0) {
/******/ 					script.crossOrigin = "anonymous";
/******/ 				}
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				// inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								}
/******/ 								return setStatus("ready").then(function () {
/******/ 									return updatedModules;
/******/ 								});
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var _publicPath = __RUSHSTACK_CURRENT_SCRIPT__ ? __RUSHSTACK_CURRENT_SCRIPT__.src : '';
/******/ 		__webpack_require__.p = _publicPath.slice(0, _publicPath.lastIndexOf('/') + 1);
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"formulario-maquinas-web-part": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatea6b61804_85fc_43d3_8837_8a99fb111bda_0_0_1"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result = newModuleFactory
/******/ 						? getAffectedModuleEffects(moduleId)
/******/ 						: {
/******/ 								type: "disposed",
/******/ 								moduleId: moduleId
/******/ 							};
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err1) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err1,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err1);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__(29);
/******/ 	__webpack_require__(826);
/******/ 	var __webpack_exports__ = __webpack_require__(863);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});})();;
//# sourceMappingURL=formulario-maquinas-web-part.js.map