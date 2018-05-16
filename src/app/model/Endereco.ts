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
    
    initialize(object: any) {
        this._initialize(object);
        this.logradouro = object.logradouro;
        this.numero = object.numero;
        this.complemento = object.complemento;
        this.estado = object.estado;
        this.cidade = object.cidade;
        this.cep = object.cep;
    }

}