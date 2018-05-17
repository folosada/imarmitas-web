import { AbstractPojo } from './AbstractPojo';
import { Cardapio } from './Cardapio';

export class ItemCardapio extends AbstractPojo {

    nome = null;

    constructor() {
        super();
    }

    initialize(object: any) {
        this._initialize(object);
        this.nome = object.nome;
    }
}
