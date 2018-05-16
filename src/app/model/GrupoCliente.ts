import { AbstractPojo } from "./AbstractPojo";
import { Endereco } from "./Endereco";

export class GrupoCliente extends AbstractPojo {
    
    nome = null
    endereco: Endereco = null
    


    constructor() {
        super();
    }
    
    initialize(object: any) {
        this._initialize(object);
        this.nome = object.nome;
        this.endereco = new Endereco();
        this.endereco.initialize(object.endereco);
    }
}