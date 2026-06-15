import * as React from 'react';
import { useState } from 'react';
import { makeStyles, themes } from './formStyles';

const FLOW_URL = 'https://defaulte8fc68b65d194bf4a2c1a5ed5dc4c2.f5.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/ee360285171e4f5f8091be3cd4e5c204/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Gj4na39slMDwQmm-UCzvgS9GX0-ODgN9DV0mMcaX1Wk';

interface NewUser { name: string; email: string; department: string; }
interface TransferDetails { files: string; programs: string; }
interface Replacement {
  oldTag: string; oldEmail: string; oldDepartment: string;
  newAnyDesk: string; sameUser: boolean;
  newUser: NewUser; needsTransfer: boolean; transferDetails: TransferDetails;
}

const blankReplacement = (): Replacement => ({
  oldTag: '', oldEmail: '', oldDepartment: '', newAnyDesk: '', sameUser: true,
  newUser: { name: '', email: '', department: '' }, needsTransfer: false, transferDetails: { files: '', programs: '' },
});

export default function FormSubstituicao({ numeroChamado, nomeEmpresa, solicitanteEmail }: { numeroChamado: string; nomeEmpresa: string; solicitanteEmail: string }) {
  const theme = themes.substituicao;
  const S = makeStyles(theme);

  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [showError, setShowError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Controle de exibição do pop-up de discordância
  const [showDisagreePopup, setShowDisagreePopup] = useState(false);

  const [formData, setFormData] = useState({
    agreed: null as boolean | null,
    requesterName: '',
    companyName: nomeEmpresa || '',
    ticketNumber: numeroChamado || '',
    replacements: [blankReplacement()],
  });

  const update = (field: string, value: unknown) => { setFormData(p => ({ ...p, [field]: value })); if (showError) setShowError(false); };

  const updateRep = (i: number, field: string, value: unknown) => {
    const arr = [...formData.replacements];
    arr[i] = { ...arr[i], [field]: value };
    setFormData(p => ({ ...p, replacements: arr }));
  };

  const updateNewUser = (i: number, field: string, value: string) => {
    const arr = [...formData.replacements];
    arr[i] = { ...arr[i], newUser: { ...arr[i].newUser, [field]: value } };
    setFormData(p => ({ ...p, replacements: arr }));
  };

  const updateTransfer = (i: number, field: string, value: string) => {
    const arr = [...formData.replacements];
    arr[i] = { ...arr[i], transferDetails: { ...arr[i].transferDetails, [field]: value } };
    setFormData(p => ({ ...p, replacements: arr }));
  };

  const addReplacement = () => setFormData(p => ({ ...p, replacements: [...p.replacements, blankReplacement()] }));
  const removeReplacement = (i: number) => {
    if (formData.replacements.length === 1) return;
    setFormData(p => ({ ...p, replacements: p.replacements.filter((_, idx) => idx !== i) }));
  };

  const validate = (s: number) => {
    if (s === 1) return formData.agreed === true;
    if (s === 2) return formData.requesterName.trim();
    if (s === 3) return formData.replacements.every(r => {
      const oldOk = r.oldTag.trim() && r.oldEmail.trim() && r.oldDepartment.trim();
      const newOk = r.sameUser || (r.newUser.name.trim() && r.newUser.email.trim() && r.newUser.department.trim());
      return oldOk && newOk;
    });
    return true;
  };

  // ATUALIZADO: Intercepta o clique no botão "Próximo" para abrir o pop-up
  const next = () => { 
    if (step === 1 && formData.agreed === false) {
      setShowDisagreePopup(true);
      return;
    }

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
      tipoFormulario: 'substituicao',
      solicitante: formData.requesterName,
      solicitanteEmail: solicitanteEmail,
      empresa: formData.companyName,
      numeroChamado: formData.ticketNumber,
      substituicoes: formData.replacements.map(r => ({
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
      })),
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
            <p style={S.brandSub}>Substituição de Equipamentos</p>
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
                <div style={S.alertBox}>
                  <span style={{ fontSize: '22px', flexShrink: 0 }}>⚠️</span>
                  <div>
                    <p style={S.alertTitle}>Termo de Substituição</p>
                    <p style={S.alertText}>
                      Ao solicitar uma substituição, você entende que a <strong>máquina substituída (Antiga)</strong> será retirada de nosso gerenciamento.
                      <br /><br />
                      Bem como a <strong>máquina colocada em seu lugar (Nova)</strong> deve permanecer em nosso contrato por no mínimo <strong>06 meses</strong>, sem possibilidade de exclusão e/ou nova substituição da mesma.
                    </p>
                  </div>
                </div>

                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' }}>
                  <label style={{ ...S.label, marginBottom: '1rem' }}>
                    Você leu o aviso acima e está ciente da política de carência (06 meses)? <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <label style={S.radioCard(formData.agreed === true)}>
                    <input type="radio" name="agreed" checked={formData.agreed === true} onChange={() => update('agreed', true)} style={{ accentColor: theme.primary }} />
                    Sim, li e estou de acordo.
                  </label>
                  
                  {/* ATUALIZADO: Agora apenas atualiza o estado, sem abrir o modal */}
                  <label style={S.radioCard(formData.agreed === false && formData.agreed !== null)}>
                    <input 
                      type="radio" 
                      name="agreed" 
                      checked={formData.agreed === false} 
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
                <span style={S.sectionSub}>Informe os dados do Sponsor ou pessoa autorizada para esta troca.</span>

                <div style={S.group}>
                  <label style={S.label}>Seu nome <span style={{ color: '#ef4444' }}>*</span></label>
                  <input style={S.input} type="text" placeholder="Sponsor ou pessoa autorizada por ele" value={formData.requesterName} onChange={e => update('requesterName', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
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
                <p style={S.sectionTitle}>Mapeamento de Substituições</p>
                <span style={S.sectionSub}>Vincule cada máquina antiga com a respectiva máquina nova.</span>

                {formData.replacements.map((rep, i) => (
                  <div key={i} style={S.itemCard}>
                    <div style={S.itemCardHeader}>
                      <span>🔄 Troca de Equipamento {i + 1}</span>
                      {formData.replacements.length > 1 && (
                        <button onClick={() => removeReplacement(i)} style={{ ...S.iconBtn, color: '#ef4444' }}>🗑</button>
                      )}
                    </div>
                    <div style={S.itemCardBody}>
                      {/* OLD MACHINE */}
                      <div style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', marginBottom: '8px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>🖥 1. Máquina que será retirada (Antiga)</p>
                        <div style={S.grid3}>
                          <div>
                            <label style={S.label}>TAG / Patrimônio <span style={{ color: '#ef4444' }}>*</span></label>
                            <input style={S.input} type="text" placeholder="Ex: PC-05" value={rep.oldTag} onChange={e => updateRep(i, 'oldTag', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                          </div>
                          <div>
                            <label style={S.label}>E-mail do usuário <span style={{ color: '#ef4444' }}>*</span></label>
                            <input style={S.input} type="email" placeholder="usuario@empresa.com" value={rep.oldEmail} onChange={e => updateRep(i, 'oldEmail', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                          </div>
                          <div>
                            <label style={S.label}>Departamento <span style={{ color: '#ef4444' }}>*</span></label>
                            <input style={S.input} type="text" placeholder="Ex: Financeiro" value={rep.oldDepartment} onChange={e => updateRep(i, 'oldDepartment', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                          </div>
                        </div>
                      </div>

                      {/* ARROW */}
                      <div style={{ textAlign: 'center', padding: '4px 0', color: '#94a3b8', fontSize: '20px' }}>↓</div>

                      {/* NEW MACHINE */}
                      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem' }}>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: '#14532d', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>💻 2. Máquina que entrará no lugar (Nova)</p>

                        <div style={S.group}>
                          <label style={S.label}>AnyDesk da Máquina Nova <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Opcional)</span></label>
                          <input style={S.input} type="text" placeholder="Ex: 123 456 789" value={rep.newAnyDesk} onChange={e => updateRep(i, 'newAnyDesk', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                          <span style={S.helpText}><a href="https://anydesk.com/pt/downloads" target="_blank" rel="noopener noreferrer" style={{ color: theme.primary }}>Baixar AnyDesk →</a></span>
                        </div>

                        <div style={{ background: '#fff', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem', marginBottom: '10px' }}>
                          <label style={{ ...S.label, marginBottom: '10px' }}>A máquina nova será destinada ao mesmo colaborador? <span style={{ color: '#ef4444' }}>*</span></label>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={S.toggleBtn(rep.sameUser)} onClick={() => updateRep(i, 'sameUser', true)}>Sim, mesmo usuário</button>
                            <button style={S.toggleBtn(!rep.sameUser, '#d97706')} onClick={() => updateRep(i, 'sameUser', false)}>Não, outro usuário</button>
                          </div>

                          {!rep.sameUser && (
                            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
                              <div style={S.grid3}>
                                <div>
                                  <label style={S.label}>Nome Completo <span style={{ color: '#ef4444' }}>*</span></label>
                                  <input style={S.input} type="text" value={rep.newUser.name} onChange={e => updateNewUser(i, 'name', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                                </div>
                                <div>
                                  <label style={S.label}>Novo E-mail <span style={{ color: '#ef4444' }}>*</span></label>
                                  <input style={S.input} type="email" value={rep.newUser.email} onChange={e => updateNewUser(i, 'email', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                                </div>
                                <div>
                                  <label style={S.label}>Novo Departamento <span style={{ color: '#ef4444' }}>*</span></label>
                                  <input style={S.input} type="text" value={rep.newUser.department} onChange={e => updateNewUser(i, 'department', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* TRANSFER TOGGLE */}
                        <div style={{ background: '#fff', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: rep.needsTransfer ? '12px' : '0' }}>
                            <div>
                              <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>Necessita transferir dados da antiga?</span>
                              <span style={{ display: 'block', fontSize: '12px', color: '#94a3b8' }}>Arquivos, configurações, favoritos, etc.</span>
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: rep.needsTransfer ? theme.primary : '#64748b' }}>
                              <input type="checkbox" checked={rep.needsTransfer} onChange={e => updateRep(i, 'needsTransfer', e.target.checked)} style={{ accentColor: theme.primary, width: '16px', height: '16px' }} />
                              {rep.needsTransfer ? 'Sim' : 'Não'}
                            </label>
                          </div>
                          {rep.needsTransfer && (
                            <div style={{ paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
                              <div style={S.grid2}>
                                <div>
                                  <label style={S.label}>Pastas / Arquivos específicos</label>
                                  <textarea style={{ ...S.textarea, minHeight: '56px' }} rows={2} placeholder="Ex: C:\Sistemas, Meus Documentos..." value={rep.transferDetails.files} onChange={e => updateTransfer(i, 'files', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                                </div>
                                <div>
                                  <label style={S.label}>Softwares / Configurações</label>
                                  <textarea style={{ ...S.textarea, minHeight: '56px' }} rows={2} placeholder="Ex: Certificados, Favoritos Chrome..." value={rep.transferDetails.programs} onChange={e => updateTransfer(i, 'programs', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button style={S.btnAddMore} onClick={addReplacement}>＋ Adicionar outra substituição</button>
              </div>
            )}

            {/* STEP 4 — REVIEW */}
            {step === 4 && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 12px' }}>✓</div>
                  <p style={{ ...S.sectionTitle, textAlign: 'center' }}>Pronto para Solicitar Substituição!</p>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>Revise o resumo das trocas antes de enviar.</span>
                </div>
                <div style={S.reviewBox}>
                  <div style={S.reviewHeader}>
                    <div><span style={S.reviewLabel}>Solicitante</span><span style={S.reviewValue}>{formData.requesterName}</span></div>
                    <div><span style={S.reviewLabel}>Empresa</span><span style={S.reviewValue}>{formData.companyName}</span></div>
                    <div><span style={S.reviewLabel}>Chamado</span><span style={S.reviewValue}>#{formData.ticketNumber}</span></div>
                  </div>
                  {formData.replacements.map((rep, i) => (
                    <div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '24px', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ ...S.reviewLabel, color: '#dc2626' }}>Sai</span>
                        <div style={{ fontWeight: 700, color: '#1e293b' }}>{rep.oldTag || 'Sem TAG'}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{rep.oldEmail}</div>
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '20px' }}>→</div>
                      <div style={{ flex: 1 }}>
                        <span style={{ ...S.reviewLabel, color: '#16a34a' }}>Entra</span>
                        <div style={{ fontWeight: 700, color: '#1e293b' }}>{rep.sameUser ? 'Mesmo Usuário' : rep.newUser.name}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>Transf. Dados: {rep.needsTransfer ? 'Sim' : 'Não'}</div>
                      </div>
                    </div>
                  ))}
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
          <p style={{ marginBottom: '6px', fontWeight: 500, color: '#64748b' }}>Não tem certeza se quer adicionar nova ou substituir?</p>
          <a href="https://wa.me/+551139451934" target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a', fontWeight: 500, marginRight: '16px' }}>WhatsApp (11) 3945-1934</a>
          <a href="mailto:suporte@phsbrasil.com.br" style={{ color: theme.primary, fontWeight: 500 }}>suporte@phsbrasil.com.br</a>
        </div>
      </div>

      {/* MODAL POP-UP DE AVISO */}
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
              Caro cliente,<br/>
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