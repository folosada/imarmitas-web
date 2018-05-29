import { AbstractPojo } from "./AbstractPojo";
import { Usuario } from "./Usuario";
import { GrupoCliente } from "./GrupoCliente";
import { Endereco } from "./Endereco";
import { DateParserUtil } from "../../common/DateParserUtil";

export class Cliente extends AbstractPojo {
    
    nome =  ""
    sobrenome = ""
    cpf = ""
    dataNasc = ""
    image_file = ""
    endereco: Endereco = null;
    usuario: Usuario = null
    grupoCliente: GrupoCliente = null
    

    constructor() {
        super();
    }

    initialize(object: any) {
        this._initialize(object);
        this.nome = object.nome;
        this.sobrenome = object.sobrenome;
        this.cpf = object.cpf;
        this.dataNasc = DateParserUtil.stringToDate(object.dataNasc);
        this.image_file = object.image_file;
        this.endereco = new Endereco();
        this.endereco.initialize(object.endereco);
        this.usuario = new Usuario();
        this.usuario.initialize(object.usuario);
        this.grupoCliente = new GrupoCliente();
        this.grupoCliente.initialize(object.grupoCliente);
    }
}