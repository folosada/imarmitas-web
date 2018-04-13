import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contentHeaders } from '../../../common/headers';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {

  constructor(public http: HttpClient) { }

  public validarLogin(params) : Observable<any> {            
    const body = JSON.stringify(params);  
    contentHeaders.delete("authorization");  
    return this.http.post(environment.serverUrl + '/restaurante/validarLogin', body, { headers: contentHeaders });
  }

  public alterarSenha(values) : Observable<any> {
    let body = JSON.stringify(values);    
    contentHeaders.delete("authorization");
    return this.http.post(environment.serverUrl + '/usuario/alterarSenha', body, { headers: contentHeaders });
  }

  public obterRestaurante(params): Observable<any> {
    params = JSON.stringify(params);
    contentHeaders.delete("authorization");
    contentHeaders.append("authorization", localStorage.getItem("id_token"));
    return this.http.post(environment.serverUrl + '/restaurante/getRestauranteByLogin', params, { headers: contentHeaders });
  }  
}
