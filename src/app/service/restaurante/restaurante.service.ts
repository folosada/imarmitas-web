import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contentHeaders } from '../../../common/headers';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class RestauranteService {

  constructor(public http: HttpClient) { }

  public gravarRestaurante(params): Observable<any> {
    contentHeaders.delete('authorization');
    if (params.id) {     
      contentHeaders.append('authorization', localStorage.getItem('id_token'));
    }
    let body = JSON.stringify(params);    
    return this.http.post(environment.serverUrl + '/restaurante/inserir', body, { headers: contentHeaders });
  }

}
