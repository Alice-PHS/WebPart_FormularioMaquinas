import * as React from 'react';
import { useState } from 'react'; // Não esqueça de importar o useState
import styles from './FormularioMaquinas.module.scss';

export default function FormExclusao({ user, numeroChamado, nomeEmpresa }: { user: string, numeroChamado: string | null, nomeEmpresa: string }) {
    // Controle de estado para as etapas do formulário
    const [etapaAtual, setEtapaAtual] = useState(1);
    const totalEtapas = 3; // O formulário de exclusão tem 3 seções principais

    // Funções para navegar entre as etapas
    const avancarEtapa = () => {
        if (etapaAtual < totalEtapas) setEtapaAtual(etapaAtual + 1);
    };

    const voltarEtapa = () => {
        if (etapaAtual > 1) setEtapaAtual(etapaAtual - 1);
    };

    return (
        <div className={`${styles.formularioMaquinas} ${styles.tipoExclusao}`}>
            <div className={styles.formContainer}>
                {/* ETAPA 1: Cabeçalho e Aviso Legal */}
                {etapaAtual === 1 && (
                    <>
                        <div className={styles.headerCard}>
                            <div className={styles.logoPHS}>
                                <img src={require('../assets/../assets/LOGO PHS.png')} alt="PHS Brasil" />
                            </div>
                            <h1 className={styles.title}>SOLICITAÇÃO PARA EXCLUSÃO DE MÁQUINA EM GERENCIAMENTO</h1>
                            <p className={styles.description}>
                                Formulário necessário para que a equipe técnica da PHS Brasil possa efetivar a exclusão de uma ou mais máquinas em seu gerenciamento contínuo - e consequentemente exclusão em contrato desta(s).
                            </p>
                        </div>

                        <div className={styles.sectionCard}>
                            <div className={styles.sectionTab}>Seção 1</div>
                            <div className={styles.importantBox}>
                                <h3 style={{ color: '#d13438' }}>IMPORTANTE</h3>
                                <p>
                                    A exclusão de máquinas do gerenciamento deve atender a alguns parâmetros previstos em contratos, são eles:<br />
                                    <strong>&gt;</strong> Não ultrapassar o limite mínimo de máquinas em contrato - Quando da assinatura, o valor a ser pago tem como base o número de máquinas gerenciadas. Portanto há um número mínimo a ser considerado a qual será avaliado pelo departamento financeiro antes do prosseguimento do pedido.<br />
                                    <strong>&gt;&gt;</strong> A máquina não pode ter sido incluída em contrato por um tempo inferior a 06 (seis) meses.
                                </p>
                            </div>
                            <div className={styles.questionGroup}>
                                <div className={styles.qLabel}>
                                    <span className={styles.qNumber}>1</span>
                                    Você leu o aviso fixado no início desta seção e assume estar ciente do propósito desta solicitação? *
                                </div>
                                <div className={styles.radioOptions}>
                                    <label><input type="radio" name="q1" /> Sim, li e estou de acordo.</label>
                                    <label><input type="radio" name="q1" /> Não li ou não estou de acordo.</label>
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
                            <div className={styles.qLabel}><span className={styles.qNumber}>4</span> Número do chamado *</div>
                            <p className={styles.helpText}>Você pode verificar este número, junto ao cabeçalho do e-mail de registro do chamado.</p>
                            <input type="text" className={styles.formInput} placeholder="O valor deve ser um número" defaultValue={numeroChamado || ''}/>
                        </div>
                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>5</span> Indique quais TAGS deverão ser excluídas *</div>
                            <input type="text" className={styles.formInput} placeholder="Insira sua resposta" />
                        </div>
                    </div>
                )}

                {/* ETAPA 3: Dados Técnicos / Finalização */}
                {etapaAtual === 3 && (
                    <div className={styles.sectionCard}>
                        <div className={styles.sectionTab}>Seção 3</div>
                        <div className={styles.importantBox}>
                            <h3 style={{ color: '#d13438' }}>Não tenho certeza se quero excluir uma máquina do meu contrato</h3>
                            <p>
                                Se você não tem certeza se o equipamento deve ser excluído do contrato, consulte novamente nossos técnicos pelos nossos canais de comunicação:
                                Whatsapp - (11) 3945-1934 (whatsapp web: <a href="https://wa.me/+551139451934" target="_blank" rel="noopener noreferrer">https://wa.me/+551139451934</a>) ou site: <a href="mailto:suporte@phsbrasil.com.br">suporte@phsbrasil.com.br</a>
                            </p>
                        </div>
                    </div>
                )}

                {/* CONTROLES DE NAVEGAÇÃO (BOTÕES) */}
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