import { Aviso } from "./Aviso.js";
export class avisoAuto extends Aviso{

    constructor(id, titulo, transaccion, descripcion, precio, puertas, kms, potencia)
    {
        super(id, titulo, transaccion, descripcion, precio);
        this.puertas = puertas;
        this.kms = kms;
        this.potencia = potencia;
    }
}