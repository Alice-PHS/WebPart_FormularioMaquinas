import * as React from 'react';
import { useState } from 'react';
import { makeStyles, themes } from './formStyles';

const FLOW_URL = 'https://defaulte8fc68b65d194bf4a2c1a5ed5dc4c2.f5.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/ee360285171e4f5f8091be3cd4e5c204/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Gj4na39slMDwQmm-UCzvgS9GX0-ODgN9DV0mMcaX1Wk';

export default function FormNovoUsuario({ numeroChamado, nomeEmpresa, solicitanteEmail }: { numeroChamado: string; nomeEmpresa: string; solicitanteEmail: string }) {
  const theme = themes.novoUsuario;
  const S = makeStyles(theme);

  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [showError, setShowError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // NOVO ESTADO: Controle de exibição do pop-up de discordância
  const [showDisagreePopup, setShowDisagreePopup] = useState(false);

  const [formData, setFormData] = useState({
    agreed: null as boolean | null,
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
  });

  const update = (field: string, value: unknown) => {
    setFormData(p => ({ ...p, [field]: value }));
    if (showError) setShowError(false);
  };

  const validate = (s: number) => {
    if (s === 1) return formData.agreed === true;
    if (s === 2) return formData.requesterName.trim();
    if (s === 3) return (
      formData.userNames.trim() && formData.emails.trim() && formData.departments.trim() &&
      formData.folders.trim() && formData.anyDeskId.trim() &&
      formData.programs.trim() && formData.printers.trim() && formData.referenceLogin.trim()
    );
    return true;
  };

  const next = () => {
    // 1. Adicione esta verificação bem no início da função
    if (step === 1 && formData.agreed === false) {
      setShowDisagreePopup(true);
      return;
    }

    // 2. Mantenha o resto da função como já era
    if (validate(step)) {
      setShowError(false);
      setStep(s => s + 1);
    } else {
      setShowError(true);
    }
  };
  const prev = () => { setShowError(false); setStep(s => s - 1); };

  const handleSubmit = async () => {
    const payload = {
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
    try {
      const res = await fetch(FLOW_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setSubmitStatus(res.ok ? 'success' : 'error');
    } catch {
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = theme.primary);
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = '#d1d5db');

  return (
    <div style={S.page}>
      <div style={S.container}>

        <div style={S.pageHeader}>
          <div>
            <p style={S.brandName}>PHS Brasil</p>
            <p style={S.brandSub}>Configuração de Novo Usuário</p>
          </div>
          <span style={S.stepBadge}>Passo {step} de {totalSteps}</span>
        </div>

        <div style={S.progressTrack}>
          <div style={{ height: '100%', width: `${(step / totalSteps) * 100}%`, background: theme.primary, borderRadius: '999px', transition: 'width 0.4s ease' }} />
        </div>

        <div style={S.card}>
          <div style={S.cardBody}>

            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <div style={{ ...S.alertBox, borderLeftColor: theme.primary, background: theme.primaryLight }}>
                  <span style={{ fontSize: '22px', flexShrink: 0 }}>ℹ️</span>
                  <div>
                    <p style={{ ...S.alertTitle, color: '#581c87' }}>Sobre esta solicitação</p>
                    <p style={{ ...S.alertText, color: '#6b21a8' }}>
                      Esta solicitação visa incluir um <strong>novo usuário</strong> a uma máquina já gerenciada pela PHS Brasil.
                      <br /><br />
                      Não será configurada máquina nova ou substituição de máquina. Ao prosseguir, você declara estar ciente e de acordo.
                    </p>
                  </div>
                </div>

                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' }}>
                  <label style={{ ...S.label, marginBottom: '1rem' }}>
                    Você leu o aviso acima e está ciente do propósito desta solicitação? <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <label style={S.radioCard(formData.agreed === true)}>
                    <input type="radio" name="agreed" checked={formData.agreed === true} onChange={() => update('agreed', true)} style={{ accentColor: theme.primary }} />
                    Sim, li e estou de acordo.
                  </label>

                  {/* ATUALIZADO: Trigger do pop-up onChange */}
                  <label style={S.radioCard(formData.agreed === false && formData.agreed !== null)}>
                    <input
                      type="radio"
                      name="agreed"
                      checked={formData.agreed === false}
                      // Só atualiza o estado agora, sem chamar o modal aqui
                      onChange={() => update('agreed', false)}
                    />
                    Não li ou não estou de acordo.
                  </label>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <p style={S.sectionTitle}>Qualificação do Solicitante</p>
                <span style={S.sectionSub}>Sponsor ou pessoa autorizada por ele.</span>

                <div style={S.group}>
                  <label style={S.label}>Seu nome <span style={{ color: '#ef4444' }}>*</span></label>
                  <input style={S.input} type="text" placeholder="Nome completo" value={formData.requesterName} onChange={e => update('requesterName', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <div style={S.group}>
                  <label style={S.label}>E-mail</label>
                  <input style={{ ...S.input, background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }} type="text" value={solicitanteEmail} readOnly />
                </div>
                <div style={S.group}>
                  <label style={S.label}>Nome da empresa</label>
                  <input style={{ ...S.input, background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }} type="text" value={formData.companyName} readOnly />
                </div>
                <div style={S.group}>
                  <label style={S.label}>Número do chamado</label>
                  <input style={{ ...S.input, background: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }} type="text" value={formData.ticketNumber} readOnly />
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>
                <p style={S.sectionTitle}>Dados da(s) Inclusão(ões)</p>
                <span style={S.sectionSub}>Forneça os dados técnicos necessários para a configuração.</span>

                <div style={S.group}>
                  <label style={S.label}>Nome completo do(s) usuário(s) <span style={{ color: '#ef4444' }}>*</span></label>
                  <textarea style={{ ...S.textarea, minHeight: '56px' }} rows={2} placeholder="Insira o(s) nome(s) completo(s)" value={formData.userNames} onChange={e => update('userNames', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <div style={S.group}>
                  <label style={S.label}>E-mail(s) <span style={{ color: '#ef4444' }}>*</span></label>
                  <textarea style={{ ...S.textarea, minHeight: '56px' }} rows={2} placeholder="Insira o(s) e-mail(s)" value={formData.emails} onChange={e => update('emails', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <div style={S.group}>
                  <label style={S.label}>Departamento(s) <span style={{ color: '#ef4444' }}>*</span></label>
                  <textarea style={{ ...S.textarea, minHeight: '56px' }} rows={2} placeholder="Insira o(s) departamento(s)" value={formData.departments} onChange={e => update('departments', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <div style={S.group}>
                  <label style={S.label}>Quais pastas serão acessadas na rede/nuvem? <span style={{ color: '#ef4444' }}>*</span></label>
                  <textarea style={{ ...S.textarea, minHeight: '56px' }} rows={2} placeholder="Insira sua resposta" value={formData.folders} onChange={e => update('folders', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                </div>

                <div style={S.grid2}>
                  <div style={S.group}>
                    <label style={S.label}>ID Team Viewer <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Opcional)</span></label>
                    <input style={S.input} type="text" placeholder="Ex: 123 456 789" value={formData.teamViewerId} onChange={e => update('teamViewerId', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                  </div>
                  <div style={S.group}>
                    <label style={S.label}>ID AnyDesk <span style={{ color: '#ef4444' }}>*</span></label>
                    <input style={S.input} type="text" placeholder="Ex: 987 654 321" value={formData.anyDeskId} onChange={e => update('anyDeskId', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                    <span style={S.helpText}><a href="https://anydesk.com/pt/downloads" target="_blank" rel="noopener noreferrer" style={{ color: theme.primary }}>Baixar AnyDesk →</a></span>
                  </div>
                </div>

                <div style={S.group}>
                  <label style={S.label}>Quais programas necessitam ser instalados? <span style={{ color: '#ef4444' }}>*</span></label>
                  <textarea style={{ ...S.textarea, minHeight: '56px' }} rows={2} placeholder="Ex: Emissor de NF, Certificados digitais..." value={formData.programs} onChange={e => update('programs', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <div style={S.group}>
                  <label style={S.label}>Quais impressoras serão utilizadas? <span style={{ color: '#ef4444' }}>*</span></label>
                  <textarea style={{ ...S.textarea, minHeight: '56px' }} rows={2} placeholder="Insira sua resposta" value={formData.printers} onChange={e => update('printers', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <div style={{ ...S.group, background: theme.primaryLight, border: `1px solid ${theme.primaryLighter}`, borderRadius: '10px', padding: '1rem' }}>
                  <label style={{ ...S.label, color: '#581c87' }}>Login de referência <span style={{ color: '#ef4444' }}>*</span></label>
                  <input style={S.input} type="text" placeholder="Ex: maria.silva" value={formData.referenceLogin} onChange={e => update('referenceLogin', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                  <span style={{ ...S.helpText, color: '#7e22ce', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.3px' }}>Login de um colaborador no mesmo departamento para efeito de referenciamento.</span>
                </div>
              </div>
            )}

            {/* STEP 4 — REVIEW */}
            {step === 4 && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: theme.primaryLighter, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 12px' }}>✓</div>
                  <p style={{ ...S.sectionTitle, textAlign: 'center' }}>Pronto para enviar!</p>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>Revise o resumo antes de enviar.</span>
                </div>

                <div style={S.reviewBox}>
                  <div style={S.reviewHeader}>
                    <div><span style={S.reviewLabel}>Solicitante</span><span style={S.reviewValue}>{formData.requesterName}</span></div>
                    <div><span style={S.reviewLabel}>Empresa</span><span style={S.reviewValue}>{formData.companyName}</span></div>
                    <div><span style={S.reviewLabel}>Chamado</span><span style={S.reviewValue}>#{formData.ticketNumber}</span></div>
                  </div>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={S.reviewLabel}>Usuários</span>
                    <span style={S.reviewValue}>{formData.userNames || '—'}</span>
                  </div>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={S.reviewLabel}>E-mails</span>
                    <span style={S.reviewValue}>{formData.emails || '—'}</span>
                  </div>
                  <div style={{ padding: '12px 16px' }}>
                    <span style={S.reviewLabel}>Departamentos</span>
                    <span style={S.reviewValue}>{formData.departments || '—'}</span>
                  </div>
                </div>

                {/* SUPPORT BOX */}
                <div style={{ ...S.alertBox, marginTop: '1.5rem', borderLeftColor: theme.primary, background: theme.primaryLight }}>
                  <span style={{ fontSize: '22px', flexShrink: 0 }}>💬</span>
                  <div>
                    <p style={{ ...S.alertTitle, color: '#581c87' }}>Não tem certeza sobre sua necessidade?</p>
                    <p style={{ ...S.alertText, color: '#6b21a8' }}>
                      Consulte nossos técnicos: WhatsApp (11) 3945-1934 ou <a href="mailto:suporte@phsbrasil.com.br" style={{ color: theme.primary }}>suporte@phsbrasil.com.br</a>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div style={S.errorBanner}>⚠ Erro ao enviar. Tente novamente ou entre em contato com o suporte.</div>
            )}
            {showError && step !== 1 && (
              <div style={S.errorBanner}>⚠ Por favor, preencha todos os campos obrigatórios (*) antes de avançar.</div>
            )}
          </div>

          <div style={S.cardFooter}>
            {step > 1 ? <button style={S.btnPrev} onClick={prev}>← Voltar</button> : <div />}
            {step < totalSteps ? (
              <button style={S.btnNext} onClick={next}>Próximo →</button>
            ) : (
              submitStatus === 'success' ? (
                <button style={{ ...S.btnSubmit, background: '#16a34a', cursor: 'default' }} disabled>
                  ✓ Enviado com sucesso!
                </button>
              ) : (
                <button style={{ ...S.btnSubmit, opacity: submitting ? 0.7 : 1 }} onClick={handleSubmit} disabled={submitting}>
                  {submitting ? 'Enviando...' : 'Enviar Solicitação'}
                </button>
              )
            )}
          </div>
        </div>

        <div style={S.helpFooter}>
          <p style={{ marginBottom: '6px', fontWeight: 500, color: '#64748b' }}>Não tem certeza se precisa de novo usuário ou nova máquina?</p>
          <a href="https://wa.me/+551139451934" target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a', fontWeight: 500, marginRight: '16px' }}>WhatsApp (11) 3945-1934</a>
          <a href="mailto:suporte@phsbrasil.com.br" style={{ color: theme.primary, fontWeight: 500 }}>suporte@phsbrasil.com.br</a>
        </div>
      </div>

      {/* MODAL POP-UP DE AVISO (NOVO) */}
      {showDisagreePopup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(3px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div style={{
            background: '#ffffff', borderRadius: '16px', padding: '2rem',
            width: '90%', maxWidth: '450px', textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', marginBottom: '1rem' }}>
              Atenção
            </h3>

            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Caro cliente,<br />
              Você poderá nos consultar via atendimento para tratar quaisquer dúvidas referentes a este assunto.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' }}>
              <a
                href="mailto:sucessodocliente@phsbrasil.com.br"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: theme.primary, color: '#fff', textDecoration: 'none',
                  padding: '12px', borderRadius: '8px', fontWeight: 500, fontSize: '0.95rem'
                }}
              >
                ✉️ sucessodocliente@phsbrasil.com.br
              </a>
              <a
                href="https://wa.me/551139451934"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: '#16a34a', color: '#fff', textDecoration: 'none',
                  padding: '12px', borderRadius: '8px', fontWeight: 500, fontSize: '0.95rem'
                }}
              >
                📱 WhatsApp: (11) 3945-1934
              </a>
            </div>

            <button
              onClick={() => setShowDisagreePopup(false)}
              style={{
                width: '100%', padding: '10px', background: '#f1f5f9', color: '#475569',
                border: '1px solid #e2e8f0', borderRadius: '8px', fontWeight: 600,
                cursor: 'pointer', transition: 'background 0.2s'
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}