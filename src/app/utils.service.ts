import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Observable, Observer } from 'rxjs/Rx';
import { DialogComponent } from './dialog/dialog.component';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class UtilsService {

  constructor(private dialog: MatDialog) { }

  public validaPattern(texto, pattern): boolean {
    let regex = new RegExp(pattern);
    return regex.test(texto); 
  }

  public validaCNPJ(cnpj): boolean {
    return this.validaPattern(cnpj, '\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}');
  }

  public validaCEP(cep): boolean {
    return this.validaPattern(cep, '\\d{5}-\\d{3}');
  }

  public validaTelefone(telefone): boolean {
    return this.validaPattern(telefone, '\\(\\d{2}\\)((\\d{4}\\d?-\\d{4})|(\\d{4}-\\d{4}\\d?))');
  }

  public validaEmail(email): boolean {
    return this.validaPattern(email, '[A-Za-z0-9\\._-]+@[A-Za-z]+(\\.[A-Za-z]+)+');
  }

  public showDialog(title: string, content: string, showCancel: boolean): Observable<boolean> {
    let dialogRef: MatDialogRef<DialogComponent>;
    let config = new MatDialogConfig();    
    
    dialogRef = this.dialog.open(DialogComponent, config);
    dialogRef.updatePosition();
    dialogRef.updateSize("300", "300");

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;   
    dialogRef.componentInstance.showCancel = showCancel;

    return dialogRef.afterClosed();
  }

  encriptPassword(password) {    
    return CryptoJS.SHA256(password).toString();
  }

  convertImageToBase64(file: FileReader) {    
    var fileBase64 = CryptoJS.enc.Base64.parse("ASD");
    alert(fileBase64);
  }

  formataStringZero(texto: string, tamanho: number) {
    let diff = tamanho - texto.length;
    let result: string = "";
    for (var i = 0; i < diff; i++) {
      result += '0';
    }
    return result + texto;
  }
}
