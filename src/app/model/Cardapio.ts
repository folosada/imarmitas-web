import { AbstractPojo } from "./AbstractPojo";
import { Restaurante } from "./Restaurante";
import { ItemCardapio } from "./ItemCardapio";

export class Cardapio extends AbstractPojo {

    descricao = null
    dataCardapio = null
    valor = null
    itensCardapio: ItemCardapio[];

    constructor() {
        super();
    }

    initialize(object: any) {
        this._initialize(object);
        this.descricao = object.descricao;
        this.valor = object.valor;
        this.itensCardapio = new Array<ItemCardapio>();
        object.itensCardapio.forEach(data => {
            const itemCardapio: ItemCardapio = new ItemCardapio();
            itemCardapio.initialize(data);
            this.itensCardapio.push(itemCardapio);
        });
    }
}