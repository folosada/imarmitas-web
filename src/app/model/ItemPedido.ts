import { AbstractPojo } from "./AbstractPojo";
import { Pedido } from "./Pedido";
import { ItemCardapio } from "./ItemCardapio";

export class ItemPedido extends AbstractPojo {
            
    valor = null
    quantidade = null
    itemCardapio: ItemCardapio = null;
    
    constructor() {
        super();
    }

    initialize(object: any) {
        this._initialize(object);
        this.valor = object.valor;
        this.quantidade = object.quantidade;
        this.itemCardapio = new ItemCardapio();
        this.itemCardapio.initialize(object.itemCardapio);
    }
}