import { DateParserUtil } from "../../common/DateParserUtil";

export abstract class AbstractPojo {

    id = null
    dataCriacao = null
    dataAlteracao = null
    dataInativacao = null
    usuarioCriacao = null
    usuarioAlteracao = null
    usuarioInativacao = null

    constructor() {
            
    }

    abstract initialize(object);

    _initialize(object) {
        if (object != null) {
            this.id = object.id;
            this.dataCriacao =  DateParserUtil.stringToDateTime(object.dataCriacao);
            this.dataAlteracao = DateParserUtil.stringToDateTime(object.dataAlteracao);
            this.dataInativacao = DateParserUtil.stringToDateTime(object.dataInativacao);
            this.usuarioCriacao = object.usuarioCriacao;
            this.usuarioAlteracao = object.usuarioAlteracao;
            this.usuarioInativacao = object.usuarioInativacao;
        }
    }
}