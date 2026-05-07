import * as React from 'react';
import { useState } from 'react';
import styles from './FormularioMaquinas.module.scss';

export default function FormSubstituicao({ user, numeroChamado, nomeEmpresa }: { user: string, numeroChamado: string | null, nomeEmpresa: string }) {
    // Estado para controlar a página atual do formulário
    const [etapaAtual, setEtapaAtual] = useState(1);
    const totalEtapas = 5; // Este formulário possui 5 seções

    // Funções de navegação
    const avancarEtapa = () => {
        if (etapaAtual < totalEtapas) setEtapaAtual(etapaAtual + 1);
    };

    const voltarEtapa = () => {
        if (etapaAtual > 1) setEtapaAtual(etapaAtual - 1);
    };

    return (
        <div className={`${styles.formularioMaquinas} ${styles.tipoSubstituicao}`}>
            <div className={styles.formContainer}>
                {/* ETAPA 1: Cabeçalho e Importante */}
                {etapaAtual === 1 && (
                    <>
                        <div className={styles.headerCard}>
                            <div className={styles.logoPHS}>
                                <img src={require('../assets/LOGO PHS.png')} alt="PHS Brasil" />
                            </div>
                            <h1 className={styles.title}>SOLICITAÇÃO PARA SUBSTITUIÇÃO DE MÁQUINAS EM GERENCIAMENTO</h1>
                            <p className={styles.description}>
                                Formulário necessário para que a equipe técnica da PHS Brasil possa efetivar a troca de uma ou mais máquinas em gerenciamento por outras novas que serão alçadas ao gerenciamento contínuo da PHS Brasil. E consequentemente tornarão as máquinas substituídas, itens não gerenciados.
                            </p>
                        </div>

                        <div className={styles.sectionCard}>
                            <div className={styles.sectionTab}>Seção 1</div>
                            <div className={styles.importantBox}>
                                <h3>Importante</h3>
                                <p>
                                    Ao solicitar uma substituição de máquina em contrato, você entende que a máquina substituída será retirada de nosso gerenciamento. Bem como a máquina colocada em seu lugar, deve permanecer em nosso contrato por no mínimo 06 meses, sem possibilidade de exclusão e/ou substituição da mesma.
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
                            <p className={styles.helpText}>Sponsor ou pessoa autorizada por ele.</p>
                            <input type="text" className={styles.formInput} placeholder="Insira sua resposta" defaultValue={user || ''}/>
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>3</span> Nome da empresa *</div>
                            <input type="text" className={styles.formInput} placeholder="Insira sua resposta" defaultValue={nomeEmpresa || ''}/>
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>4</span> Número do chamado *</div>
                            <p className={styles.helpText}>Você pode verificar este número, junto ao cabeçalho do e-mail de registro do chamado.</p>
                            <input type="text" className={styles.formInput} placeholder="O valor deve ser um número"  defaultValue={numeroChamado || ''}/>
                        </div>
                    </div>
                )}

                {/* ETAPA 3: Dados das Substituições */}
                {etapaAtual === 3 && (
                    <div className={styles.sectionCard}>
                        <div className={styles.sectionTab}>Seção 3</div>
                        <h2 className={styles.greenTitle}>DADOS DA(S) SUBSTITUIÇÃO(ÕES)</h2>
                        <p className={styles.helpText}>Aqui você deve fornecer os dados técnicos referente as máquinas a serem substituídas.</p>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>5</span> Quantidade de máquinas a serem substituídas? *</div>
                            <div className={styles.radioOptions}>
                                {['01', '02', '03', '04', '05', 'Superior a 05 máquinas'].map((opcao, index) => (
                                    <label key={index}><input type="radio" name="q5" value={opcao} /> {opcao}</label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>6</span> TAG das máquinas a serem substituídas *</div>
                            <p className={styles.helpText}>Separe com ponto-vírgula</p>
                            <textarea className={styles.formInput} rows={3} placeholder="Insira sua resposta" />
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>7</span> E-mails *</div>
                            <textarea className={styles.formInput} rows={3} placeholder="Insira sua resposta" />
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>8</span> Departamentos *</div>
                            <textarea className={styles.formInput} rows={3} placeholder="Insira sua resposta" />
                        </div>
                    </div>
                )}

                {/* ETAPA 4: Dados das máquinas novas */}
                {etapaAtual === 4 && (
                    <div className={styles.sectionCard}>
                        <div className={styles.sectionTab}>Seção 4</div>
                        <h2 className={styles.greenTitle}>Dados das máquinas novas</h2>
                        <p className={styles.helpText}>Aqui você informa os dados das máquinas que farão parte do gerenciamento</p>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>9</span> AnyDesk da(s) máquina(s)</div>
                            <p className={styles.helpText}>Caso não possua, pode encontrar o arquivo para downloads aqui: <a href="https://anydesk.com/pt/downloads" target="_blank" rel="noopener noreferrer">https://anydesk.com/pt/downloads</a></p>
                            <textarea className={styles.formInput} rows={2} placeholder="Insira sua resposta" />
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>10</span> A(s) máquina(s) nova(s) será(ão) destinada(s) ao(s) mesmo(s) colaborador(es)? *</div>
                            <select
                                className={styles.formInput}
                                defaultValue=""
                                aria-label="A máquina nova será destinada ao mesmo colaborador?"
                                title="Selecione se a máquina será destinada ao mesmo colaborador"
                            >
                                <option value="" disabled>Selecionar sua resposta</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                        </div>

                        <div className={styles.questionGroup}>
                            <div className={styles.qLabel}><span className={styles.qNumber}>11</span> Caso seja para outro colaborador, informe abaixo o nome completo, e-mail e departamento *</div>
                            <textarea className={styles.formInput} rows={3} placeholder="Insira sua resposta" />
                        </div>
                    </div>
                )}

                {/* ETAPA 5: Suporte / Finalização */}
                {etapaAtual === 5 && (
                    <div className={styles.sectionCard}>
                        <div className={styles.sectionTab}>Seção 5</div>
                        <div className={styles.importantBox}>
                            <h3 style={{ color: '#0078d4' }}>NÃO TENHO CERTEZA SE QUERO ADICIONAR OU SUBSTITUIR EQUIPAMENTO</h3>
                            <p>
                                Se você não tem certeza se quer adicionar nova máquina ou substituir máquina existente, consulte novamente nossos técnicos pelos nossos canais de comunicação:
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