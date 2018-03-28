import { AbstractPojo } from "./AbstractPojo";
import { Usuario } from "./Usuario";
import { GrupoCliente } from "./GrupoCliente";

export class Cliente extends AbstractPojo {

    nome =  ""
    sobrenome = ""
    cpf = ""
    dataNasc = ""
    image_file = ""
    endereco = {}
    usuario:Usuario = null
    grupoCliente:GrupoCliente = null
    

    constructor() {
        super();
    }    
}