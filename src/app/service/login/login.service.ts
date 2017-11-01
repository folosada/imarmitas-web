import { Injectable } from '@angular/core';
import { Http, XSRFStrategy } from '@angular/http';
import { contentHeaders } from '../../../common/headers';
import { Observable } from 'rxjs/Rx'
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {

  constructor(public http: Http, public xsrfStrategy: XSRFStrategy) { }

  public validarLogin(userId, userPassword) : Observable<any> {    
    contentHeaders.delete('token');
    contentHeaders.append('token', localStorage.getItem('id_token'));
    let body = JSON.stringify({ userId, userPassword });    
    return this.http.post(environment.serverUrl + '/login', body, { headers: contentHeaders });
  }

  public alterarSenha(values) : Observable<any> {
    let body = JSON.stringify(values);    
    return this.http.post(environment.serverUrl + '/alterarSenha', body, { headers: contentHeaders });
  }
}
