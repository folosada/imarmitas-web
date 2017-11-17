import { Injectable } from '@angular/core';
import { Http, XSRFStrategy } from '@angular/http';
import { contentHeaders } from '../../../common/headers';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {

  constructor(public http: Http, public xsrfStrategy: XSRFStrategy) { }

  public validarLogin(login, senha) : Observable<any> {    
    //contentHeaders.delete('token');
    //contentHeaders.append('token', localStorage.getItem('id_token'));
    let body = JSON.stringify({ login, senha });    
    return this.http.post(environment.serverUrl + '/usuario/validarLogin', body, { headers: contentHeaders });
  }

  public alterarSenha(values) : Observable<any> {
    let body = JSON.stringify(values);    
    return this.http.post(environment.serverUrl + '/alterarSenha', body, { headers: contentHeaders });
  }
}
