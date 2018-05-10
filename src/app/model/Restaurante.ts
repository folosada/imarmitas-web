import { AbstractPojo } from "./AbstractPojo";
import { Endereco } from "./Endereco";
import { UsuarioRestaurante } from "./UsuarioRestaurante";
import { Usuario } from "./Usuario";

export class Restaurante extends AbstractPojo {

    razaoSocial = null
    nomeFantasia = null
    cnpj = null
    endereco: Endereco = null
    logo_file = null
    telefone = null
    usuarios: UsuarioRestaurante[]
    
    public removerUsuario(login: String) {
        let usuarios = this.usuarios.filter((usuarioRestaurante) => {
            return usuarioRestaurante.usuario.login == login;
        });
        let index = this.usuarios.indexOf(usuarios[0]);
        this.usuarios.splice(index, 1);
    }

    constructor() {
        super();
        this.endereco = new Endereco;
        this.usuarios = new Array<UsuarioRestaurante>();
    }
}