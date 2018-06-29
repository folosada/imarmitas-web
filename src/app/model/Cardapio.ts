import { AbstractPojo } from "./AbstractPojo";
import { ItemCardapio } from "./ItemCardapio";
import { Restaurante } from "./Restaurante";

export class Cardapio extends AbstractPojo {

    descricao = null
    diaSemana = null
    valor = null
    itensCardapio: ItemCardapio[];
    restaurante: Restaurante;

    constructor() {
        super();
    }

    initialize(object: any) {
        this._initialize(object);
        this.descricao = object.descricao;
        this.valor = object.valor;
        this.itensCardapio = new Array<ItemCardapio>();
        this.diaSemana = object.diaSemana;
        this.restaurante = object.restaurante;
        object.itensCardapio.forEach(data => {
            const itemCardapio: ItemCardapio = new ItemCardapio();
            itemCardapio.initialize(data);
            this.itensCardapio.push(itemCardapio);
        });
    }
}