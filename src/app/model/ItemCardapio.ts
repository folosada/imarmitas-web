import { AbstractPojo } from "./AbstractPojo";
import { Cardapio } from "./Cardapio";

export class ItemCardapio extends AbstractPojo {
    
    nome = null
    cardapio: Cardapio = null
    
    constructor() {
        super();
    }

}