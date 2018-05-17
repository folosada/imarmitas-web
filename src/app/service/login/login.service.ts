import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarmitaHeaders } from '../../../common/headers';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {

  constructor(public http: HttpClient) { }

  public validarLogin(params): Observable<any> {
    const body = JSON.stringify(params);
    const header = MarmitaHeaders.get();
    return this.http.post(environment.serverUrl + '/usuario/validarLogin',
                          body, header);
  }

  public alterarSenha(values): Observable<any> {
    const body = JSON.stringify(values);
    const header = MarmitaHeaders.get();
    return this.http.post(environment.serverUrl + '/usuario/alterarSenha', body,  header);
  }

  public obterRestaurante(params): Observable<any> {
    params = JSON.stringify(params);
    const header = MarmitaHeaders.getAuth(localStorage.getItem('id_token'));
    return this.http.post(environment.serverUrl + '/restaurante/getRestauranteByLogin', params, header);
  }
}
