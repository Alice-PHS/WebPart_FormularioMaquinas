import * as React from 'react';
import { useState } from 'react';
import { makeStyles, themes } from './formStyles';

interface ExclusionEntry { tag: string; additionalInfo: string; }

export default function FormExclusao({ user, numeroChamado, nomeEmpresa }: { user: string; numeroChamado: string | null; nomeEmpresa: string }) {
  const theme = themes.exclusao;
  const S = makeStyles(theme);

  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    agreed: null as boolean | null,
    requesterName: user || '',
    companyName: nomeEmpresa || '',
    ticketNumber: numeroChamado || '',
    exclusions: [{ tag: '', additionalInfo: '' }] as ExclusionEntry[],
  });

  const update = (field: string, value: unknown) => {
    setFormData(p => ({ ...p, [field]: value }));
    if (showError) setShowError(false);
  };

  const updateExclusion = (i: number, field: string, value: string) => {
    const arr = [...formData.exclusions];
    arr[i] = { ...arr[i], [field]: value };
    setFormData(p => ({ ...p, exclusions: arr }));
    if (showError) setShowError(false);
  };

  const addExclusion = () => setFormData(p => ({ ...p, exclusions: [...p.exclusions, { tag: '', additionalInfo: '' }] }));
  const removeExclusion = (i: number) => {
    if (formData.exclusions.length === 1) return;
    setFormData(p => ({ ...p, exclusions: p.exclusions.filter((_, idx) => idx !== i) }));
  };

  const validate = (s: number) => {
    if (s === 1) return formData.agreed === true;
    if (s === 2) return formData.requesterName.trim() && formData.companyName.trim() && formData.ticketNumber.trim();
    if (s === 3) return formData.exclusions.every(e => e.tag.trim());
    return true;
  };

  const next = () => { if (validate(step)) { setShowError(false); setStep(s => s + 1); } else setShowError(true); };
  const prev = () => { setShowError(false); setStep(s => s - 1); };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = theme.primary);
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = '#d1d5db');

  return (
    <div style={S.page}>
      <div style={S.container}>

        <div style={S.pageHeader}>
          <div>
            <p style={S.brandName}>PHS Brasil</p>
            <p style={S.brandSub}>Exclusão de Equipamentos</p>
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
                    <p style={S.alertTitle}>Termo de Exclusão de Máquinas</p>
                    <p style={S.alertText}>
                      A exclusão de máquinas do gerenciamento deve atender a alguns parâmetros previstos em contrato:
                    </p>
                    <ul style={{ ...S.alertText, paddingLeft: '1.25rem', marginTop: '8px' }}>
                      <li style={{ marginBottom: '6px' }}><strong>Não ultrapassar o limite mínimo:</strong> O valor pago baseia-se no número de máquinas. Há um número mínimo que será avaliado pelo departamento financeiro.</li>
                      <li><strong>Carência mínima:</strong> A máquina não pode ter sido incluída no contrato há menos de <strong>06 (seis) meses</strong>.</li>
                    </ul>
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
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <p style={S.sectionTitle}>Qualificação do Solicitante</p>
                <span style={S.sectionSub}>Informe os dados do Sponsor ou pessoa autorizada para esta exclusão.</span>

                <div style={S.group}>
                  <label style={S.label}>Nome do solicitante <span style={{ color: '#ef4444' }}>*</span></label>
                  <input style={S.input} type="text" placeholder="Sponsor ou pessoa autorizada por ele" value={formData.requesterName} onChange={e => update('requesterName', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <div style={S.group}>
                  <label style={S.label}>Nome da empresa <span style={{ color: '#ef4444' }}>*</span></label>
                  <input style={S.input} type="text" placeholder="Sua Empresa LTDA" value={formData.companyName} onChange={e => update('companyName', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <div style={S.group}>
                  <label style={S.label}>Número do chamado <span style={{ color: '#ef4444' }}>*</span></label>
                  <input style={S.input} type="text" placeholder="Ex: 95389" value={formData.ticketNumber} onChange={e => update('ticketNumber', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                  <span style={S.helpText}>Localizado no cabeçalho do e-mail de registro do chamado.</span>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>
                <p style={S.sectionTitle}>Máquinas para Exclusão</p>
                <span style={S.sectionSub}>Indique as TAGs das máquinas que deverão ser retiradas do contrato.</span>

                {formData.exclusions.map((exc, i) => (
                  <div key={i} style={{ ...S.itemCard, borderColor: '#fecaca' }}>
                    <div style={{ ...S.itemCardHeader, background: '#fef2f2', color: '#991b1b' }}>
                      <span>🖥 Equipamento {i + 1}</span>
                      {formData.exclusions.length > 1 && (
                        <button onClick={() => removeExclusion(i)} style={{ ...S.iconBtn, color: '#ef4444' }} title="Remover">🗑</button>
                      )}
                    </div>
                    <div style={S.itemCardBody}>
                      <div style={S.grid2}>
                        <div>
                          <label style={S.label}>TAG / Patrimônio <span style={{ color: '#ef4444' }}>*</span></label>
                          <input style={S.input} type="text" placeholder="Ex: PC-05, LPT-10" value={exc.tag} onChange={e => updateExclusion(i, 'tag', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                        </div>
                        <div>
                          <label style={S.label}>Observações <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Opcional)</span></label>
                          <input style={S.input} type="text" placeholder="Usuário anterior, departamento..." value={exc.additionalInfo} onChange={e => updateExclusion(i, 'additionalInfo', e.target.value)} onFocus={inputFocus} onBlur={inputBlur} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button style={{ ...S.btnAddMore, borderColor: '#fca5a5', color: '#b91c1c' }} onClick={addExclusion}>
                  ＋ Adicionar outra máquina para exclusão
                </button>
              </div>
            )}

            {/* STEP 4 — REVIEW */}
            {step === 4 && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: '#dc2626', margin: '0 auto 12px' }}>✓</div>
                  <p style={{ ...S.sectionTitle, textAlign: 'center' }}>Pronto para Solicitar Exclusão!</p>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>Revise o resumo antes de enviar.</span>
                </div>
                <div style={S.reviewBox}>
                  <div style={S.reviewHeader}>
                    <div><span style={S.reviewLabel}>Solicitante</span><span style={S.reviewValue}>{formData.requesterName}</span></div>
                    <div><span style={S.reviewLabel}>Empresa</span><span style={S.reviewValue}>{formData.companyName}</span></div>
                    <div><span style={S.reviewLabel}>Chamado</span><span style={S.reviewValue}>#{formData.ticketNumber}</span></div>
                  </div>
                  <div style={{ background: '#fef2f2', padding: '10px 16px', borderBottom: '1px solid #fecaca' }}>
                    <span style={{ ...S.reviewLabel, color: '#991b1b' }}>Total de máquinas a excluir: {formData.exclusions.length}</span>
                  </div>
                  {formData.exclusions.map((exc, i) => (
                    <div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', background: '#fee2e2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🖥</div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#1e293b' }}>{exc.tag}</div>
                          {exc.additionalInfo && <div style={{ fontSize: '12px', color: '#94a3b8' }}>{exc.additionalInfo}</div>}
                        </div>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#dc2626', background: '#fee2e2', padding: '3px 10px', borderRadius: '999px' }}>A Excluir</span>
                    </div>
                  ))}
                </div>
              </div>
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
              <button style={{ ...S.btnSubmit, background: '#dc2626', boxShadow: '0 2px 8px #dc262655' }} onClick={() => alert('Formulário de EXCLUSÃO enviado com sucesso!')}>
                Enviar Solicitação
              </button>
            )}
          </div>
        </div>

        <div style={S.helpFooter}>
          <p style={{ marginBottom: '6px', fontWeight: 500, color: '#64748b' }}>Não tem certeza se o equipamento deve ser excluído?</p>
          <a href="https://wa.me/+551139451934" target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a', fontWeight: 500, marginRight: '16px' }}>WhatsApp (11) 3945-1934</a>
          <a href="mailto:suporte@phsbrasil.com.br" style={{ color: theme.primary, fontWeight: 500 }}>suporte@phsbrasil.com.br</a>
        </div>
      </div>
    </div>
  );
}
