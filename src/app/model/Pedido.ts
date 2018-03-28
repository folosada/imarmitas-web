import { AbstractPojo } from "./AbstractPojo";
import { Cardapio } from "./Cardapio";
import { Cliente } from "./Cliente";

export class Pedido extends AbstractPojo {

    dataPedido = null
    descricao = null
    formaPagamento = null
    status = null
    cardapio: Cardapio = null
    cliente: Cliente = null
    avaliacaoRestaurante = null
    
    constructor() {
        super();
    }
}