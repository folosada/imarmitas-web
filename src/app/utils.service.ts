import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  public validaPattern(texto, pattern): boolean {
    let regex = new RegExp(pattern);
    return regex.test(texto); 
  }

}
