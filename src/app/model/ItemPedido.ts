import { AbstractPojo } from "./AbstractPojo";
import { Pedido } from "./Pedido";

export class ItemPedido extends AbstractPojo {

    pedido: Pedido = null
    itemPedido: ItemPedido = null
    valor = null
    quantidade = null
    
    constructor() {
        super();
    }
}