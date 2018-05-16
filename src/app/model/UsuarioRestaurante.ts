import { AbstractPojo } from "./AbstractPojo";
import { Usuario } from "./Usuario";

export class UsuarioRestaurante extends AbstractPojo {
   
    usuario: Usuario = null    
    administrador: string = null
        
    constructor(usuario: Usuario = null, administrador: string = null) {
        super();
        this.usuario = usuario;
        this.administrador = administrador;        
    }

    initialize(object: any) {
        this._initialize(object);
        this.usuario = new Usuario();
        this.usuario.initialize(object.usuario);
        this.administrador = object.administrador;        
    }
}