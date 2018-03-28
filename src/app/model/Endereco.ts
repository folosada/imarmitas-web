import { AbstractPojo } from "./AbstractPojo";

export class Endereco extends AbstractPojo {
    
    logradouro = null
    numero = null
    complemento = null
    estado = null
    cidade = null
    cep = null
    

    constructor() {
        super();
    }
    
}