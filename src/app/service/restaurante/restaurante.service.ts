import { Injectable } from '@angular/core';
import { Http, XSRFStrategy } from '@angular/http';
import { contentHeaders } from '../../../common/headers';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class RestauranteService {

  constructor(public http: Http, public xsrfStrategy: XSRFStrategy) { }

  public gravarRestaurante(params): Observable<any> {
    contentHeaders.delete('token');
    contentHeaders.append('token', localStorage.getItem('id_token'));
    let body = JSON.stringify(params);    
    return this.http.post(environment.serverUrl + '/restaurante/salvar', body, { headers: contentHeaders });
  }

}
