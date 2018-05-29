import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarmitaHeaders } from '../../../common/headers';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {

  constructor(public http: HttpClient) { }

  public validarLogin(params) : Observable<any> {            
    const body = JSON.stringify(params);
    let header = MarmitaHeaders.get();      
    return this.http.post(environment.serverUrl + '/usuario/validarLogin', 
                          body, header);
  }

  public alterarSenha(values) : Observable<any> {
    let body = JSON.stringify(values);        
    let header = MarmitaHeaders.get();
    return this.http.post(environment.serverUrl + '/usuario/alterarSenha', body,  header);
  }

  public obterRestaurante(params): Observable<any> {
    params = JSON.stringify(params);
    let header = MarmitaHeaders.getAuth(localStorage.getItem("id_token"));
    return this.http.post(environment.serverUrl + '/restaurante/getRestauranteByLogin', params, header);
  }

  public obterUsuariosRestaurante(id_restaurante): Observable<any> {
    let header = MarmitaHeaders.getAuth(localStorage.getItem('id_token'));
    return this.http.get(environment.serverUrl + '/restaurante/buscarUsuariosRestaurante?id=' + id_restaurante, header);
  }


}
