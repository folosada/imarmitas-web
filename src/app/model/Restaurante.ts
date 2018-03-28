import { AbstractPojo } from "./AbstractPojo";
import { Endereco } from "./Endereco";

export class Restaurante extends AbstractPojo {

    razaoSocial = null
    nomeFantasia = null
    cnpj = null
    endereco: Endereco = null
    logo_file = null
    telefone = null
    

    constructor() {
        super();
    }
}