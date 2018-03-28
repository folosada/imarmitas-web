import { AbstractPojo } from "./AbstractPojo";
import { Restaurante } from "./Restaurante";

export class Cardapio extends AbstractPojo {

    descricao = null
    dataCardapio = null
    restaurante:Restaurante = null
    valor = null

    constructor() {
        super();
    }
}