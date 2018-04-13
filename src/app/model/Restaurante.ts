import { AbstractPojo } from "./AbstractPojo";
import { Endereco } from "./Endereco";
import { UsuarioRestaurante } from "./UsuarioRestaurante";

export class Restaurante extends AbstractPojo {

    razaoSocial = null
    nomeFantasia = null
    cnpj = null
    endereco: Endereco = null
    logo_file = null
    telefone = null
    usuarios: UsuarioRestaurante[]
    

    constructor() {
        super();
        this.endereco = new Endereco;
    }
}