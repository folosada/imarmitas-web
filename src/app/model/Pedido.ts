import { AbstractPojo } from './AbstractPojo';
import { Cardapio } from './Cardapio';
import { Cliente } from './Cliente';
import { ItemPedido } from './ItemPedido';
import { GrupoCliente } from './GrupoCliente';

export class Pedido extends AbstractPojo {

    dataPedido = null;
    descricao = null;
    formaPagamento = null;
    status = null;
    cardapio: Cardapio = null;
    cliente: Cliente = null;
    avaliacaoRestaurante = null;
    itensPedido: ItemPedido[] = null;
    grupoCliente: GrupoCliente = null;
    valor = null;

    constructor() {
        super();
    }

    initialize(object: any) {
        this._initialize(object);
        this.dataPedido = object.dataPedido;
        this.descricao = object.descricao;
        this.formaPagamento = object.formaPagamento;
        this.status = object.status;
        this.valor = object.valor;
        this.cardapio = new Cardapio();
        this.cardapio.initialize(object.cardapio);;
        this.cliente = new Cliente();
        this.cliente.initialize(object.cliente);
        this.avaliacaoRestaurante = object.avaliacaoRestaurante;
        this.grupoCliente = new GrupoCliente();
        this.grupoCliente.initialize(object.grupoCliente);
        this.itensPedido = new Array<ItemPedido>();
        object.itensPedido.forEach(data => {
            let itemPedido: ItemPedido = new ItemPedido();
            itemPedido.initialize(data);
            this.itensPedido.push(itemPedido);
        });
    }
}