interface MaquinaLote {
    tag: string;
    hostname: string;
    equCodigo: number | null;
    departamento: string;
}
interface FormExclusaoProps {
    numeroChamado: string;
    nomeEmpresa: string;
    solicitanteEmail: string;
    tag?: string;
    hostname?: string;
    equCodigo?: string;
    departamento?: string;
    maquinas?: MaquinaLote[];
}
export default function FormExclusao({ numeroChamado, nomeEmpresa, solicitanteEmail, tag, hostname, equCodigo, maquinas }: FormExclusaoProps): JSX.Element;
export {};
//# sourceMappingURL=FormExclusao.d.ts.map