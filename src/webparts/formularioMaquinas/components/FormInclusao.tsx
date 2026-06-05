import * as React from 'react';
import { useState } from 'react';
import { makeStyles, themes } from './formStyles';

interface UserEntry { name: string; email: string; department: string; }
interface TransferData {
  oldMachineName: string; filesToTransfer: string;
  programsToTransfer: string; transferBrowserFavs: boolean; transferEmailSignatures: boolean;
}

export default function FormInclusao({ user, numeroChamado, nomeEmpresa }: { user: string; numeroChamado: string | null; nomeEmpresa: string }) {
  const theme = themes.inclusao;
  const S = makeStyles(theme);

  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    agreed: false as boolean | null,
    requesterName: user || '',
    companyName: nomeEmpresa || '',
    ticketNumber: numeroChamado || '',
    users: [{ name: '', email: '', department: '' }] as UserEntry[],
    folders: '', teamViewer: '', anyDesk: '', programs: '', printers: '', referenceLogin: '',
    needsTransfer: false as boolean,
    transferData: {
      oldMachineName: '', filesToTransfer: '', programsToTransfer: '',
      transferBrowserFavs: false, transferEmailSignatures: false,
    } as TransferData,
  });

  const update = (field: string, value: unknown) => {
    setFormData(p => ({ ...p, [field]: value }));
    if (showError) setShowError(false);
  };

  const updateTransfer = (field: string, value: unknown) =>
    setFormData(p => ({ ...p, transferData: { ...p.transferData, [field]: value } }));

  const updateUser = (i: number, field: string, value: string) => {
    const arr = [...formData.users];
    arr[i] = { ...arr[i], [field]: value };
    setFormData(p => ({ ...p, users: arr }));
  };

  const addUser = () => setFormData(p => ({ ...p, users: [...p.users, { name: '', email: '', department: '' }] }));
  const removeUser = (i: number) => {
    if (formData.users.length === 1) return;
    setFormData(p => ({ ...p, users: p.users.filter((_, idx) => idx !== i) }));
  };

  const validate = (s: number) => {
    if (s === 1) return formData.agreed === true;
    if (s === 2) return formData.requesterName.trim() && formData.companyName.trim() && formData.ticketNumber.trim();
    if (s === 3) return formData.users.every(u => u.name.trim() && u.email.trim() && u.department.trim());
    if (s === 4) return formData.folders.trim() && formData.programs.trim() && formData.printers.trim() && formData.referenceLogin.trim();
    if (s === 5) return !formData.needsTransfer || formData.transferData.oldMachineName.trim();
    return true;
  };

  const next = () => { if (validate(step)) { setShowError(false); setStep(s => s + 1); } else setShowError(true); };
  const prev = () => { setShowError(false); setStep(s => s - 1); };

  const progress = (step / totalSteps) * 100;

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
                  <label style={S.radioCard(formData.agreed === false && formData.agreed !== null)}>
                    <input type="radio" name="agreed" checked={formData.agreed === false} onChange={() => { update('agreed', false); setShowError(true); }} />
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
                  <label style={S.label}>Nome do solicitante <span style={{ color: '#ef4444' }}>*</span></label>
                  <input style={S.input} type="text" placeholder="Ponto focal ou pessoa autorizada" value={formData.requesterName} onChange={e => update('requesterName', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <div style={S.group}>
                  <label style={S.label}>Nome da empresa <span style={{ color: '#ef4444' }}>*</span></label>
                  <input style={S.input} type="text" placeholder="Sua Empresa LTDA" value={formData.companyName} onChange={e => update('companyName', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <div style={S.group}>
                  <label style={S.label}>Número do chamado <span style={{ color: '#ef4444' }}>*</span></label>
                  <input style={S.input} type="text" placeholder="Ex: 95389" value={formData.ticketNumber} onChange={e => update('ticketNumber', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                  <span style={S.helpText}>Você pode verificar este número junto ao cabeçalho do e-mail de registro do chamado.</span>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>
                <p style={S.sectionTitle}>Dados das Inclusões</p>
                <span style={S.sectionSub}>Adicione as máquinas preenchendo os dados básicos dos usuários.</span>

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
                        <div>
                          <label style={S.label}>E-mail <span style={{ color: '#ef4444' }}>*</span></label>
                          <input style={S.input} type="email" placeholder="joao@empresa.com.br" value={u.email} onChange={e => updateUser(i, 'email', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                        </div>
                        <div>
                          <label style={S.label}>Departamento <span style={{ color: '#ef4444' }}>*</span></label>
                          <input style={S.input} type="text" placeholder="Ex: Financeiro" value={u.department} onChange={e => updateUser(i, 'department', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button style={S.btnAddMore} onClick={addUser}>
                  ＋ Adicionar mais uma máquina
                </button>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div>
                <p style={S.sectionTitle}>Especificações Técnicas</p>
                <span style={S.sectionSub}>Detalhes de acessos, softwares e impressoras necessários.</span>

                <div style={S.group}>
                  <label style={S.label}>Quais pastas serão acessadas na rede/nuvem? <span style={{ color: '#ef4444' }}>*</span></label>
                  <textarea style={{ ...S.textarea, minHeight: '60px' }} rows={2} placeholder="Ex: Servidor Z: // Público / Departamento Pessoal / OneDrive Geral" value={formData.folders} onChange={e => update('folders', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                </div>

                <div style={S.grid2}>
                  <div style={S.group}>
                    <label style={S.label}>ID Team Viewer <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Opcional)</span></label>
                    <input style={S.input} type="text" placeholder="Ex: 123 456 789" value={formData.teamViewer} onChange={e => update('teamViewer', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                  </div>
                  <div style={S.group}>
                    <label style={S.label}>ID AnyDesk <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Opcional)</span></label>
                    <input style={S.input} type="text" placeholder="Ex: 987 654 321" value={formData.anyDesk} onChange={e => update('anyDesk', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                    <span style={S.helpText}><a href="https://anydesk.com/pt/downloads" target="_blank" rel="noopener noreferrer" style={{ color: theme.primary }}>Baixar AnyDesk →</a></span>
                  </div>
                </div>

                <div style={S.group}>
                  <label style={S.label}>Quais programas necessitam ser instalados? <span style={{ color: '#ef4444' }}>*</span></label>
                  <textarea style={{ ...S.textarea, minHeight: '60px' }} rows={2} placeholder="Ex: Pacote Office, Emissor de NF, Certificados Digitais..." value={formData.programs} onChange={e => update('programs', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <div style={S.group}>
                  <label style={S.label}>Quais impressoras serão utilizadas? <span style={{ color: '#ef4444' }}>*</span></label>
                  <input style={S.input} type="text" placeholder="Ex: Impressora HP RH, Plotter Engenharia" value={formData.printers} onChange={e => update('printers', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <div style={{ ...S.group, background: theme.primaryLight, border: `1px solid ${theme.primaryLighter}`, borderRadius: '10px', padding: '1rem' }}>
                  <label style={{ ...S.label, color: '#1e3a8a' }}>Login de referência <span style={{ color: '#ef4444' }}>*</span></label>
                  <input style={S.input} type="text" placeholder="Ex: maria.silva" value={formData.referenceLogin} onChange={e => update('referenceLogin', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                  <span style={{ ...S.helpText, color: '#1e40af', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.3px' }}>Login de um colaborador no mesmo departamento para cópia de permissões.</span>
                </div>
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div>
                <p style={S.sectionTitle}>Transferência de Dados</p>
                <span style={S.sectionSub}>Indique se será necessário realizar backup de uma máquina antiga para a nova.</span>

                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                  <label style={{ ...S.label, marginBottom: '1rem' }}>Haverá transferência de arquivos ou configurações de uma máquina antiga?</label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={S.toggleBtn(formData.needsTransfer)} onClick={() => update('needsTransfer', true)}>✓ Sim, necessito transferência</button>
                    <button style={S.toggleBtn(!formData.needsTransfer, '#64748b')} onClick={() => update('needsTransfer', false)}>Não, máquina zerada</button>
                  </div>
                </div>

                {formData.needsTransfer && (
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' }}>
                    <div style={S.group}>
                      <label style={S.label}>Identificação da Máquina Antiga <span style={{ color: '#ef4444' }}>*</span></label>
                      <input style={S.input} type="text" placeholder="Ex: PC-CONTABILIDADE-02 ou Patrimônio 1599" value={formData.transferData.oldMachineName} onChange={e => updateTransfer('oldMachineName', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                    </div>
                    <div style={S.group}>
                      <label style={S.label}>Arquivos e Pastas Específicas</label>
                      <textarea style={{ ...S.textarea, minHeight: '56px' }} rows={2} placeholder="Ex: C:\Sistemas\NFe, Meus Documentos..." value={formData.transferData.filesToTransfer} onChange={e => updateTransfer('filesToTransfer', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                    </div>
                    <div style={S.group}>
                      <label style={S.label}>Configurações de Softwares</label>
                      <textarea style={{ ...S.textarea, minHeight: '56px' }} rows={2} placeholder="Ex: Token bancário, Senhas do sistema ERP..." value={formData.transferData.programsToTransfer} onChange={e => updateTransfer('programsToTransfer', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                    </div>
                    <label style={{ ...S.label, marginBottom: '8px' }}>Itens Comuns:</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151', marginBottom: '8px' }}>
                      <input type="checkbox" checked={formData.transferData.transferBrowserFavs} onChange={e => updateTransfer('transferBrowserFavs', e.target.checked)} style={{ accentColor: theme.primary }} />
                      Favoritos do Navegador (Chrome/Edge)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151' }}>
                      <input type="checkbox" checked={formData.transferData.transferEmailSignatures} onChange={e => updateTransfer('transferEmailSignatures', e.target.checked)} style={{ accentColor: theme.primary }} />
                      Assinaturas e contatos do Outlook
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* STEP 6 — REVIEW */}
            {step === 6 && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 12px' }}>✓</div>
                  <p style={{ ...S.sectionTitle, textAlign: 'center' }}>Tudo pronto para enviar!</p>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>Revise o resumo antes de enviar.</span>
                </div>
                <div style={S.reviewBox}>
                  <div style={S.reviewHeader}>
                    <div><span style={S.reviewLabel}>Solicitante</span><span style={S.reviewValue}>{formData.requesterName}</span></div>
                    <div><span style={S.reviewLabel}>Empresa</span><span style={S.reviewValue}>{formData.companyName}</span></div>
                    <div><span style={S.reviewLabel}>Chamado</span><span style={S.reviewValue}>#{formData.ticketNumber}</span></div>
                  </div>
                  <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={S.reviewLabel}>Total de Máquinas</span>
                    <span style={{ ...S.reviewValue, fontSize: '20px', color: theme.primary }}>{formData.users.length}</span>
                  </div>
                  <div style={{ padding: '1rem 1.25rem' }}>
                    <span style={S.reviewLabel}>Transferência de Dados</span>
                    <span style={S.reviewValue}>
                      {formData.needsTransfer ? `✓ Sim — ${formData.transferData.oldMachineName}` : '✗ Não necessária'}
                    </span>
                  </div>
                </div>
              </div>
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
            ) : (
              <button style={S.btnSubmit} onClick={() => alert('Formulário de INCLUSÃO enviado com sucesso!')}>
                Enviar Solicitação
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
    </div>
  );
}
