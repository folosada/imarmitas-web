import { Injectable } from '@angular/core';
import { Http, XSRFStrategy } from '@angular/http';
import { contentHeaders } from '../../../common/headers';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class CardapioService {

  constructor(public http: Http, public xsrfStrategy: XSRFStrategy) { }
  
  public buscarCardapios(id_restaurante): Observable<any> {
    contentHeaders.delete('authorization');
    contentHeaders.append('authorization', localStorage.getItem('id_token'));            
    return this.http.get(environment.serverUrl + '/cardapio/buscarTodos?id_restaurante=' + id_restaurante, { headers: contentHeaders });
  }

}
