import { AbstractPojo } from './AbstractPojo';
import { Endereco } from './Endereco';
import { UsuarioRestaurante } from './UsuarioRestaurante';
import { Usuario } from './Usuario';
import { Cardapio } from './Cardapio';
import * as moment from 'moment';

export class Restaurante extends AbstractPojo {

    razaoSocial = null;
    nomeFantasia = null;
    cnpj = null;
    endereco: Endereco = null;
    logo_file = null;
    telefone = null;
    usuariosRestaurante: UsuarioRestaurante[];
    cardapios: Cardapio[];

    initialize(object) {
        this._initialize(object);
        this.razaoSocial = object.razaoSocial;
        this.nomeFantasia = object.nomeFantasia;
        this.cnpj = object.cnpj;
        this.endereco = new Endereco();
        this.endereco.initialize(object.endereco);
        this.logo_file = object.logo_file;
        this.telefone = object.telefone;
        this.usuariosRestaurante = new Array<UsuarioRestaurante>();
        // tslint:disable-next-line:no-unused-expression
        object.usuariosRestaurante && this.initializeUsuariosRestaurante(object.usuariosRestaurante);
        this.cardapios = new Array<Cardapio>();
        // tslint:disable-next-line:no-unused-expression
        object.cardapios && this.initializeCardapios(object.cardapios);
    }

    public initializeUsuariosRestaurante(object) {
        if (object != null) {
            object.forEach(data => {
                const usuarioRestaurante: UsuarioRestaurante = new UsuarioRestaurante();
                usuarioRestaurante.initialize(data);
                this.usuariosRestaurante.push(usuarioRestaurante);
            });
        }
    }

    public initializeCardapios(object) {
        if (object != null) {
            object.forEach(data => {
                const cardapio: Cardapio = new Cardapio();
                cardapio.initialize(data);
                this.cardapios.push(cardapio);
            });
        }
    }

    public removerUsuario(login: String) {
        const usuarios = this.usuariosRestaurante.forEach((usuarioRestaurante) => {
            if (usuarioRestaurante.usuario.login === login) {
                usuarioRestaurante.usuario.dataInativacao = moment().valueOf();
                usuarioRestaurante.usuario.usuarioInativacao = localStorage.getItem('userId');
                usuarioRestaurante.dataInativacao = moment().valueOf();
                usuarioRestaurante.usuarioInativacao = localStorage.getItem('userId');
            }
        });
    }

    public getUsuario(login: string): UsuarioRestaurante {
        const usuarioRestaurante: UsuarioRestaurante[] = this.usuariosRestaurante.filter(usuarioRestaurante => {
            return usuarioRestaurante.usuario.login === login;
        });
        return usuarioRestaurante[0];
    }

    constructor() {
        super();
        this.endereco = new Endereco;
        this.usuariosRestaurante = new Array<UsuarioRestaurante>();
    }
}
