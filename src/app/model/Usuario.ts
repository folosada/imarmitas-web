import { AbstractPojo } from "./AbstractPojo";

export class Usuario extends AbstractPojo {
        
    login = null;
    senha = null;
    email = null;

    constructor() {
        super();
    }

    initialize(object: any) {
        this._initialize(object);
        this.login = object.login;
        this.senha = object.senha;
        this.email = object.email;
    }    
}