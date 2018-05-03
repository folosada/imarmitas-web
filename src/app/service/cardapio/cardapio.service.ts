import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { contentHeaders } from '../../../common/headers';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class CardapioService {

  constructor(public http: HttpClient) { }
  
  public buscarCardapios(id_restaurante): Observable<any> {
    contentHeaders.delete('authorization');
    contentHeaders.append('authorization', localStorage.getItem('id_token'));            
    return this.http.get(environment.serverUrl + '/cardapio/buscarTodos?id_restaurante=' + id_restaurante, { headers: contentHeaders });
  }

  public gravarCardapio(params): Observable<any> {
    contentHeaders.delete('authorization');
    contentHeaders.append('authorization', localStorage.getItem('id_token'));            
    params = JSON.stringify(params);
    return this.http.post(environment.serverUrl + '/cardapio/inserir', params, { headers: contentHeaders });
  }

  public removerCardapio(id_cardapio): Observable<any> {
    contentHeaders.delete('authorization');
    contentHeaders.append('authorization', localStorage.getItem('id_token'));                
    return this.http.get(environment.serverUrl + '/cardapio/removerCardapio?id_cardapio=' + id_cardapio, { headers: contentHeaders });
  }
}
