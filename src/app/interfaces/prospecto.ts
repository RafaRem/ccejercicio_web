export interface Prospecto {
    id?: string;
    nombre: string,
    apaterno: string,
    amaterno?: string,
    calle: string,
    numero: string,
    colonia: string,
    codigopostal: string,
    telefono: string,
    rfc: string,
    estado?: string,
    observacion?:string,
}
