import { AbstractPojo } from "./AbstractPojo";
import { Usuario } from "./Usuario";
import { Restaurante } from "./Restaurante";

export class UsuarioRestaurante extends AbstractPojo {

    usuario: Usuario = null
    restaurante: Restaurante = null
    administrador = null
    
    constructor() {
        super();
    }
}