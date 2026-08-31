import * as React from 'react';
import { useState } from 'react';
import { makeStyles, themes } from './formStyles';
import { enviarSolicitacao } from '../services/solicitacoesService';
import { isValidEmail } from './validation';

// Envio agora vai para o backend: POST /api/solicitacoes (via solicitacoesService).

interface TransferData {
  oldMachineName: string; filesToTransfer: string;
  programsToTransfer: string; transferBrowserFavs: boolean; transferEmailSignatures: boolean;
}

// Cada maquina carrega o conjunto completo de perguntas (identificacao,
// especificacoes tecnicas e transferencia de dados).
interface UserEntry {
  name: string; email: string; department: string;
  folders: string; teamViewer: string; anyDesk: string;
  programs: string; printers: string; referenceLogin: string;
  needsTransfer: boolean;
  transferData: TransferData;
}

const blankTransfer = (): TransferData => ({
  oldMachineName: '', filesToTransfer: '', programsToTransfer: '',
  transferBrowserFavs: false, transferEmailSignatures: false,
});

const blankUser = (): UserEntry => ({
  name: '', email: '', department: '',
  folders: '', teamViewer: '', anyDesk: '',
  programs: '', printers: '', referenceLogin: '',
  needsTransfer: false,
  transferData: blankTransfer(),
});

export default function FormInclusao({ numeroChamado, nomeEmpresa, solicitanteEmail }: { numeroChamado: string; nomeEmpresa: string; solicitanteEmail: string }) {
  const theme = themes.inclusao;
  const S = makeStyles(theme);

  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [showError, setShowError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // NOVO ESTADO: Controle de exibição do pop-up de discordância
  const [showDisagreePopup, setShowDisagreePopup] = useState(false);

  const [formData, setFormData] = useState({
    agreed: false as boolean | false,
    requesterName: '',
    companyName: nomeEmpresa || '',
    ticketNumber: numeroChamado || '',
    users: [blankUser()] as UserEntry[],
  });

  const update = (field: string, value: unknown) => {
    setFormData(p => ({ ...p, [field]: value }));
    if (showError) setShowError(false);
  };

  const updateUser = (i: number, field: keyof UserEntry, value: string | boolean) => {
    setFormData(p => ({ ...p, users: p.users.map((u, idx) => (idx === i ? { ...u, [field]: value } : u)) }));
    if (showError) setShowError(false);
  };

  const updateTransfer = (i: number, field: keyof TransferData, value: string | boolean) => {
    setFormData(p => ({
      ...p,
      users: p.users.map((u, idx) => (idx === i ? { ...u, transferData: { ...u.transferData, [field]: value } } : u)),
    }));
    if (showError) setShowError(false);
  };

  const addUser = () => setFormData(p => ({ ...p, users: [...p.users, blankUser()] }));
  const removeUser = (i: number) => {
    if (formData.users.length === 1) return;
    setFormData(p => ({ ...p, users: p.users.filter((_, idx) => idx !== i) }));
  };

  const validate = (s: number) => {
    if (s === 1) return formData.agreed === true;
    if (s === 2) return formData.requesterName.trim();
    if (s === 3) return formData.users.every(u => (
      u.name.trim() && u.email.trim() && isValidEmail(u.email) && u.department.trim() &&
      u.folders.trim() && u.programs.trim() && u.referenceLogin.trim() &&
      (!u.needsTransfer || u.transferData.oldMachineName.trim())
    ));
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

  const progress = (step / totalSteps) * 100;

  const handleSubmit = async () => {
    const payload = {
      tipoFormulario: 'inclusao',
      solicitante: formData.requesterName,
      solicitanteEmail: solicitanteEmail,
      empresa: formData.companyName,
      numeroChamado: formData.ticketNumber,
      maquinas: formData.users.map(u => ({
        nomeUsuario: u.name,
        email: u.email,
        departamento: u.department,
        especificacoesTecnicas: {
          pastas: u.folders,
          teamViewer: u.teamViewer,
          anyDesk: u.anyDesk,
          programas: u.programs,
          impressoras: u.printers,
          loginReferencia: u.referenceLogin,
        },
        transferenciaDados: {
          necessaria: u.needsTransfer,
          maquinaAntiga: u.transferData.oldMachineName,
          arquivos: u.transferData.filesToTransfer,
          programas: u.transferData.programsToTransfer,
          favoritosNavegador: u.transferData.transferBrowserFavs,
          assinaturasOutlook: u.transferData.transferEmailSignatures,
        },
      })),
    };

    setSubmitting(true);
    try {
      const ok = await enviarSolicitacao(payload);
      setSubmitStatus(ok ? 'success' : 'error');
    } catch {
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.target.style.borderColor = theme.primary);
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.target.style.borderColor = '#d1d5db');

  return (
    <div style={S.page}>
      <div style={S.container}>

        {/* HEADER */}
        <div style={S.pageHeader}>
          <div>
            <p style={S.brandName}>PHS Brasil</p>
            <p style={S.brandSub}>Inclusão em Gerenciamento</p>
          </div>
          <span style={S.stepBadge}>Passo {step} de {totalSteps}</span>
        </div>

        {/* PROGRESS BAR */}
        <div style={S.progressTrack}>
          <div style={{ height: '100%', width: `${progress}%`, background: theme.primary, borderRadius: '999px', transition: 'width 0.4s ease' }} />
        </div>

        {/* CARD */}
        <div style={S.card}>
          <div style={S.cardBody}>

            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <div style={S.alertBox}>
                  <span style={{ fontSize: '22px', flexShrink: 0 }}>⚠️</span>
                  <div>
                    <p style={S.alertTitle}>Aviso Importante</p>
                    <p style={S.alertText}>
                      Ao preencher e enviar este formulário, você está solicitando à equipe técnica da <strong>PHS Brasil Consultoria em Informática</strong> que inclua as máquinas descritas neste documento em seu contrato de gerenciamento contínuo.
                      <br /><br />
                      <strong>Atenção:</strong> Isso poderá acarretar em acréscimos nos valores pagos atualmente, de acordo com as cláusulas previstas em seu contrato.
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

                {showError && formData.agreed === false && (
                  <div style={S.errorBanner}>⚠ Você precisa estar de acordo para prosseguir com a inclusão.</div>
                )}
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <p style={S.sectionTitle}>Qualificação do Solicitante</p>
                <span style={S.sectionSub}>Informe os dados de quem está autorizando esta inclusão.</span>

                <div style={S.group}>
                  <label style={S.label}>Seu nome <span style={{ color: '#ef4444' }}>*</span></label>
                  <input style={S.input} type="text" placeholder="Ponto focal ou pessoa autorizada" value={formData.requesterName} onChange={e => update('requesterName', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
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
                <p style={S.sectionTitle}>Dados das Inclusões</p>
                <span style={S.sectionSub}>Preencha os dados de cada máquina separadamente.</span>

                {formData.users.map((u, i) => (
                  <div key={i} style={S.itemCard}>
                    <div style={S.itemCardHeader}>
                      <span>💻 Máquina {i + 1}</span>
                      {formData.users.length > 1 && (
                        <button onClick={() => removeUser(i)} style={{ ...S.iconBtn, color: '#ef4444' }} title="Remover">🗑</button>
                      )}
                    </div>
                    <div style={S.itemCardBody}>

                      <div style={{ ...S.group, marginBottom: '12px' }}>
                        <label style={S.label}>Nome completo do usuário <span style={{ color: '#ef4444' }}>*</span></label>
                        <input style={S.input} type="text" placeholder="Ex: João da Silva" value={u.name} onChange={e => updateUser(i, 'name', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                      </div>

                      <div style={S.grid2}>
                        <div style={S.group}>
                          <label style={S.label}>E-mail <span style={{ color: '#ef4444' }}>*</span></label>
                          <input
                            style={{ ...S.input, borderColor: showError && u.email.trim() && !isValidEmail(u.email) ? '#ef4444' : undefined }}
                            type="email"
                            placeholder="joao@empresa.com.br"
                            value={u.email}
                            onChange={e => updateUser(i, 'email', e.target.value)}
                            onFocus={inputFocus}
                            onBlur={inputBlur}
                          />
                          {showError && u.email.trim() && !isValidEmail(u.email) && (
                            <span style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px', display: 'block' }}>E-mail inválido.</span>
                          )}
                        </div>
                        <div style={S.group}>
                          <label style={S.label}>Departamento <span style={{ color: '#ef4444' }}>*</span></label>
                          <input style={S.input} type="text" placeholder="Ex: Financeiro" value={u.department} onChange={e => updateUser(i, 'department', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                        </div>
                      </div>

                      <div style={S.group}>
                        <label style={S.label}>Quais pastas serão acessadas na rede/nuvem? <span style={{ color: '#ef4444' }}>*</span></label>
                        <textarea style={{ ...S.textarea, minHeight: '60px' }} rows={2} placeholder="Ex: Servidor Z: // Público / Departamento Pessoal / OneDrive Geral" value={u.folders} onChange={e => updateUser(i, 'folders', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                      </div>

                      <div style={S.grid2}>
                        <div style={S.group}>
                          <label style={S.label}>ID Team Viewer <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Opcional)</span></label>
                          <input style={S.input} type="text" placeholder="Ex: 123 456 789" value={u.teamViewer} onChange={e => updateUser(i, 'teamViewer', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                        </div>
                        <div style={S.group}>
                          <label style={S.label}>ID AnyDesk <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Opcional)</span></label>
                          <input style={S.input} type="text" placeholder="Ex: 987 654 321" value={u.anyDesk} onChange={e => updateUser(i, 'anyDesk', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                          <span style={S.helpText}><a href="https://anydesk.com/pt/downloads" target="_blank" rel="noopener noreferrer" style={{ color: theme.primary }}>Baixar AnyDesk →</a></span>
                        </div>
                      </div>

                      <div style={S.group}>
                        <label style={S.label}>Quais programas necessitam ser instalados? <span style={{ color: '#ef4444' }}>*</span></label>
                        <textarea style={{ ...S.textarea, minHeight: '60px' }} rows={2} placeholder="Ex: Pacote Office, Emissor de NF, Certificados Digitais..." value={u.programs} onChange={e => updateUser(i, 'programs', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                      </div>

                      <div style={S.group}>
                        <label style={S.label}>Quais impressoras serão utilizadas? </label>
                        <input style={S.input} type="text" placeholder="Ex: Impressora HP RH, Plotter Engenharia" value={u.printers} onChange={e => updateUser(i, 'printers', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                      </div>

                      <div style={{ ...S.group, background: theme.primaryLight, border: `1px solid ${theme.primaryLighter}`, borderRadius: '10px', padding: '1rem' }}>
                        <label style={{ ...S.label, color: '#1e3a8a' }}>Login de referência <span style={{ color: '#ef4444' }}>*</span></label>
                        <input style={S.input} type="text" placeholder="Ex: maria.silva" value={u.referenceLogin} onChange={e => updateUser(i, 'referenceLogin', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                        <span style={{ ...S.helpText, color: '#1e40af', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.3px' }}>Login de um colaborador no mesmo departamento para cópia de permissões.</span>
                      </div>

                      {/* TRANSFERÊNCIA DE DADOS — por máquina */}
                      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', marginBottom: 0 }}>
                        <label style={{ ...S.label, marginBottom: '10px' }}>Haverá transferência de arquivos ou configurações de uma máquina antiga?</label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <button style={S.toggleBtn(u.needsTransfer)} onClick={() => updateUser(i, 'needsTransfer', true)}>✓ Sim, necessito transferência</button>
                          <button style={S.toggleBtn(!u.needsTransfer, '#64748b')} onClick={() => updateUser(i, 'needsTransfer', false)}>Não, máquina zerada</button>
                        </div>

                        {u.needsTransfer && (
                          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
                            <div style={S.group}>
                              <label style={S.label}>Identificação da Máquina Antiga <span style={{ color: '#ef4444' }}>*</span></label>
                              <input style={S.input} type="text" placeholder="Ex: PC-CONTABILIDADE-02 ou Patrimônio 1599" value={u.transferData.oldMachineName} onChange={e => updateTransfer(i, 'oldMachineName', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                            </div>
                            <div style={S.grid2}>
                              <div style={S.group}>
                                <label style={S.label}>Arquivos e Pastas Específicas</label>
                                <textarea style={{ ...S.textarea, minHeight: '56px' }} rows={2} placeholder="Ex: Sistemas/NFe, Meus Documentos..." value={u.transferData.filesToTransfer} onChange={e => updateTransfer(i, 'filesToTransfer', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                              </div>
                              <div style={S.group}>
                                <label style={S.label}>Configurações de Softwares</label>
                                <textarea style={{ ...S.textarea, minHeight: '56px' }} rows={2} placeholder="Ex: Token bancário, Senhas do sistema ERP..." value={u.transferData.programsToTransfer} onChange={e => updateTransfer(i, 'programsToTransfer', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                              </div>
                            </div>
                            <label style={{ ...S.label, marginBottom: '8px' }}>Itens Comuns:</label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151', marginBottom: '8px' }}>
                              <input type="checkbox" checked={u.transferData.transferBrowserFavs} onChange={e => updateTransfer(i, 'transferBrowserFavs', e.target.checked)} style={{ accentColor: theme.primary }} />
                              Favoritos do Navegador (Chrome/Edge)
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151' }}>
                              <input type="checkbox" checked={u.transferData.transferEmailSignatures} onChange={e => updateTransfer(i, 'transferEmailSignatures', e.target.checked)} style={{ accentColor: theme.primary }} />
                              Assinaturas e contatos do Outlook
                            </label>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                ))}

                <button style={S.btnAddMore} onClick={addUser}>
                  ＋ Adicionar mais uma máquina
                </button>
              </div>
            )}

            {/* STEP 4 — REVIEW */}
            {step === 4 && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 12px' }}>✓</div>
                  <p style={{ ...S.sectionTitle, textAlign: 'center' }}>Tudo pronto para enviar!</p>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>Revise o resumo antes de enviar.</span>
                </div>
                <div style={S.reviewBox}>
                  <div style={{ ...S.reviewHeader, gridTemplateColumns: 'repeat(4, 1fr)' }}>
                    <div><span style={S.reviewLabel}>Solicitante</span><span style={S.reviewValue}>{formData.requesterName}</span></div>
                    <div><span style={S.reviewLabel}>Empresa</span><span style={S.reviewValue}>{formData.companyName}</span></div>
                    <div><span style={S.reviewLabel}>Chamado</span><span style={S.reviewValue}>#{formData.ticketNumber}</span></div>
                    <div><span style={S.reviewLabel}>Máquinas</span><span style={{ ...S.reviewValue, color: theme.primary }}>{formData.users.length}</span></div>
                  </div>
                  {formData.users.map((u, i) => (
                    <div key={i} style={{ padding: '12px 16px', borderBottom: i < formData.users.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <span style={{ ...S.reviewLabel, color: theme.primary }}>💻 Máquina {i + 1}</span>
                      <span style={S.reviewValue}>{u.name || '—'}</span>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', lineHeight: 1.7 }}>
                        <div>{u.email || '—'} · {u.department || '—'}</div>
                        <div>Pastas: {u.folders || '—'}</div>
                        <div>Programas: {u.programs || '—'}</div>
                        <div>Impressoras: {u.printers || '—'}</div>
                        <div>AnyDesk: {u.anyDesk || '—'}{u.teamViewer ? ` · TeamViewer: ${u.teamViewer}` : ''}</div>
                        <div>Login de referência: {u.referenceLogin || '—'}</div>
                        <div>Transferência: {u.needsTransfer ? `✓ Sim — ${u.transferData.oldMachineName}` : '✗ Não necessária'}</div>
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

          {/* FOOTER NAV */}
          <div style={S.cardFooter}>
            {step > 1 ? (
              <button style={S.btnPrev} onClick={prev}>← Voltar</button>
            ) : <div />}
            {step < totalSteps ? (
              <button style={S.btnNext} onClick={next}>Próximo →</button>
            ) : submitStatus === 'success' ? (
              <button style={{ ...S.btnSubmit, background: '#16a34a', cursor: 'default' }} disabled>
                ✓ Enviado com sucesso!
              </button>
            ) : (
              <button style={{ ...S.btnSubmit, opacity: submitting ? 0.7 : 1 }} onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Enviando...' : 'Enviar Solicitação'}
              </button>
            )}
          </div>
        </div>

        {/* HELP */}
        <div style={S.helpFooter}>
          <p style={{ marginBottom: '6px', fontWeight: 500, color: '#64748b' }}>Não tenho certeza se quero adicionar ou substituir equipamento.</p>
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
