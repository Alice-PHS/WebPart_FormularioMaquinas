import * as React from 'react';
import { useState } from 'react';
import styles from './FormularioMaquinas.module.scss';

export default function FormNovoUsuario({ user, numeroChamado, nomeEmpresa }: { user: string, numeroChamado: string | null, nomeEmpresa: string }) {
    // Controle de estado para as etapas do formulário
    const [etapaAtual, setEtapaAtual] = useState(1);
    const totalEtapas = 4; // Este formulário tem 4 etapas

    // Funções de navegação
    const avancarEtapa = () => {
        if (etapaAtual < totalEtapas) setEtapaAtual(etapaAtual + 1);
    };

    const voltarEtapa = () => {
        if (etapaAtual > 1) setEtapaAtual(etapaAtual - 1);
    };

    return (
        <div className={`${styles.formularioMaquinas} ${styles.tipoNovoUsuario}`}>
            <div className={styles.formContainer}>
                {/* ETAPA 1: Cabeçalho e Importante */}
                {etapaAtual === 1 && (
                    <>
                        <div className={styles.headerCard}>
                            <div className={styles.logoPHS}>
                                <img src={require('../assets/LOGO PHS.png')} alt="PHS Brasil" />
                            </div>
                            <h1 className={styles.title}>SOLICITAÇÃO PARA CONFIGURAÇÃO DE NOVO USUÁRIO EM MÁQUINA GERENCIADA</h1>
                            <p className={styles.description}>
                                Formulário necessário para que a equipe técnica da PHS Brasil possa efetivar a configuração de uma ou mais contas de usuários em máquinas gerenciadas.
                            </p>
                        </div>

                        <div className={styles.sectionCard}>
                            <div className={styles.sectionTab}>Seção 1</div>
                            <div className={styles.importantBox}>
                                <h3>IMPORTANTE</h3>
                                <p>
                                    Esta solicitação visa incluir um novo usuário a uma máquina já gerenciada pela PHS Brasil. Não será configurada máquina nova ou substituição de máquina.<br />
                                    Ao prosseguir, você declara estar ciente e de acordo.
                                </p>
                            </div>
                            <div className={styles.questionGroup}>
                                <div className={styles.qLabel}>
                                    <span className={styles.qNumber}>1</span>
                                    Você leu o aviso fixado no início desta seção e assume estar ciente do propósito desta solicitação? *
                                </div>
                                <div className={styles.radioOptions}>
                                    <label><input type="radio" name="q1" value="sim" /> Sim, li e estou de acordo.</label>
                                    <label><input type="radio" name="q1" value="nao" /> Não li ou não estou de acordo.</label>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* ETAPA 2: Qualificação do Solicitante */}
                {etapaAtual === 2 && (
                    <div className={styles.sectionCard}>
                        <div className={styles.sectionTab}>Seção 2</div>
                        <h2 className={styles.greenTitle}>QUALIFICAÇÃO DO SOLICITANTE</h2>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>2</span> Nome do solicitante *</div>
                            <p className={styles.helpText}>Sponsor ou pessoa autorizada por ele</p>
                            <input type="text" className={styles.formInput} placeholder="Insira sua resposta" defaultValue={user || ''}/>
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>3</span> Nome da empresa *</div>
                            <input type="text" className={styles.formInput} placeholder="Insira sua resposta" defaultValue={nomeEmpresa || ''}/>
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>4</span> Qual o número do chamado? *</div>
                            <p className={styles.helpText}>Você pode verificar este número, junto ao cabeçalho do e-mail de registro do chamado.</p>
                            <input type="text" className={styles.formInput} placeholder="O valor deve ser um número" defaultValue={numeroChamado || ''} />
                        </div>
                    </div>
                )}

                {/* ETAPA 3: Dados da Inclusão */}
                {etapaAtual === 3 && (
                    <div className={styles.sectionCard}>
                        <div className={styles.sectionTab}>Seção 3</div>
                        <h2 className={styles.greenTitle}>DADOS DA(S) INCLUSÃO(ÕES)</h2>
                        <p className={styles.helpText}>Aqui você deve fornecer os dados técnicos necessários para a inclusão.</p>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>5</span> Nome completo do(s) usuário(s) *</div>
                            <textarea className={styles.formInput} rows={2} placeholder="Insira sua resposta" />
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>6</span> E-mail(s) *</div>
                            <textarea className={styles.formInput} rows={2} placeholder="Insira sua resposta" />
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>7</span> Departamento(s) *</div>
                            <textarea className={styles.formInput} rows={2} placeholder="Insira sua resposta" />
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>8</span> Quais pastas serão acessadas na rede/nuvem? *</div>
                            <textarea className={styles.formInput} rows={2} placeholder="Insira sua resposta" />
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>9</span> ID Team Viewer</div>
                            <textarea className={styles.formInput} rows={1} placeholder="Insira sua resposta" />
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>10</span> ID AnyDesk *</div>
                            <p className={styles.helpText}>Caso não possua, pode encontrar o arquivo para downloads aqui: <a href="https://anydesk.com/pt/downloads" target="_blank" rel="noopener noreferrer">https://anydesk.com/pt/downloads</a></p>
                            <textarea className={styles.formInput} rows={1} placeholder="Insira sua resposta" />
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>11</span> Quais programas necessitam ser instalados? (Ex: Emissor de NF, Certificados digitais e etc...) *</div>
                            <textarea className={styles.formInput} rows={2} placeholder="Insira sua resposta" />
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>12</span> Quais impressoras serão utilizadas? *</div>
                            <textarea className={styles.formInput} rows={2} placeholder="Insira sua resposta" />
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>13</span> Login de referência *</div>
                            <p className={styles.helpText}>LOGIN DE UM COLABORADOR NO MESMO DEPARTAMENTO - PARA EFEITO DE REFERENCIAMENTO</p>
                            <input type="text" className={styles.formInput} placeholder="Insira sua resposta" />
                        </div>
                    </div>
                )}

                {/* ETAPA 4: Suporte / Finalização */}
                {etapaAtual === 4 && (
                    <div className={styles.sectionCard}>
                        <div className={styles.sectionTab}>Seção 4</div>
                        <div className={styles.importantBox}>
                            <h3 style={{ color: '#c239b3' }}>SE VOCÊ NÃO TEM CERTEZA DE QUAL SUA NECESSIDADE</h3>
                            <p>
                                Se você não tem certeza se quer adicionar novo usuário a uma máquina já pertencente ao contrato, adicionar nova máquina ao contrato ou substituir máquina existente, consulte novamente nossos técnicos pelos nossos canais de comunicação:
                                Whatsapp - (11) 3945-1934 (whatsapp web: <a href="https://wa.me/+551139451934" target="_blank" rel="noopener noreferrer">https://wa.me/+551139451934</a>) ou site: <a href="mailto:suporte@phsbrasil.com.br">suporte@phsbrasil.com.br</a>
                            </p>
                        </div>
                    </div>
                )}

                {/* CONTROLES DE NAVEGAÇÃO */}
                <div className={styles.navigationButtons}>
                    {etapaAtual > 1 && (
                        <button type="button" onClick={voltarEtapa} className={styles.btnVoltar}>
                            VOLTAR
                        </button>
                    )}
                    
                    {etapaAtual < totalEtapas ? (
                        <button type="button" onClick={avancarEtapa} className={styles.btnAvancar}>
                            AVANÇAR
                        </button>
                    ) : (
                        <button type="submit" className={styles.btnSubmit}>
                            ENVIAR FORMULÁRIO
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}