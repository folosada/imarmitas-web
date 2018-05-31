import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarmitaHeaders } from '../../../common/headers';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class RestauranteService {

  constructor(public http: HttpClient) { }

  public gravarRestaurante(params): Observable<any> {
    let header;
    if (params.id) {
      header = MarmitaHeaders.getAuth(localStorage.getItem('id_token'));
    } else {
      header = MarmitaHeaders.get();
    }
    const b = {
      "usuario" : JSON.stringify(params.usuariosRestaurante),
      "restaurante" : JSON.stringify(params)
    }
    const body = JSON.stringify(b);    
    return this.http.post(environment.serverUrl + '/restaurante/inserir', body, header);
  }

}
