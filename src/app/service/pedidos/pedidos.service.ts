import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarmitaHeaders } from '../../../common/headers';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { stat } from 'fs';

@Injectable()
export class PedidosService {

  constructor(public http: HttpClient) { }

  public buscarPedidos(id_restaurante): Observable<any> {
    const header = MarmitaHeaders.getAuth(localStorage.getItem('id_token'));
    return this.http.get(environment.serverUrl + '/pedido/pedidosRestaurante?id_restaurante=' + id_restaurante, header);
  }

  public alterarStatus(params, id_pedido, status): Observable<any> {
    const header = MarmitaHeaders.getAuth(localStorage.getItem('id_token'));
    params = JSON.stringify(params);
    return this.http.post(environment.serverUrl + '/pedido/alterarStatus?id_pedido=' + id_pedido + '&status=' + status, params, header);
  }
}
