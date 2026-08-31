interface MaquinaLote {
    tag: string;
    hostname: string;
    equCodigo: number | null;
    departamento: string;
}
interface FormSubstituicaoProps {
    numeroChamado: string;
    nomeEmpresa: string;
    solicitanteEmail: string;
    tag?: string;
    hostname?: string;
    equCodigo?: string;
    departamento?: string;
    maquinas?: MaquinaLote[];
}
export default function FormSubstituicao({ numeroChamado, nomeEmpresa, solicitanteEmail, tag, hostname, equCodigo, departamento, maquinas }: FormSubstituicaoProps): JSX.Element;
export {};
//# sourceMappingURL=FormSubstituicao.d.ts.map