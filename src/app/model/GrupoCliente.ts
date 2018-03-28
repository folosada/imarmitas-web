import { AbstractPojo } from "./AbstractPojo";
import { Endereco } from "./Endereco";

export class GrupoCliente extends AbstractPojo {

    nome = null
    endereco: Endereco = null
    


    constructor() {
        super();
    }
    
}