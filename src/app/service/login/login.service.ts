import { Injectable } from '@angular/core';
import { Http, XSRFStrategy } from '@angular/http';
import { contentHeaders } from '../../../common/headers';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {

  constructor(public http: Http, public xsrfStrategy: XSRFStrategy) { }

  public validarLogin(params) : Observable<any> {            
    const body = JSON.stringify(params);    
    return this.http.post(environment.serverUrl + '/restaurante/validarLogin', body, { headers: contentHeaders });
  }

  public alterarSenha(values) : Observable<any> {
    let body = JSON.stringify(values);    
    return this.http.post(environment.serverUrl + '/usuario/alterarSenha', body, { headers: contentHeaders });
  }
}
