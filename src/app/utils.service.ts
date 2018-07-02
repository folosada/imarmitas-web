import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Observable, Observer } from 'rxjs/Rx';
import { DialogComponent } from './components/dialog/dialog.component';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class UtilsService {

  constructor(private dialog: MatDialog) { }

  public validaPattern(texto, pattern): boolean {
    const regex = new RegExp(pattern);
    return regex.test(texto);
  }

  public validaCNPJ(cnpj): boolean {
    return this.validaPattern(cnpj, '\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}');
  }

  public validaCEP(cep): boolean {
    return this.validaPattern(cep, '\\d{5}-\\d{3}');
  }

  public validaTelefone(telefone): boolean {
    return this.validaPattern(telefone, '(\\(\\d{2}\\))(\\s?)(\\d{4}-\\d{4}\\d?)');
  }

  public validaEmail(email): boolean {
    return this.validaPattern(email, '[A-Za-z0-9\\._-]+@[A-Za-z]+(\\.[A-Za-z]+)+');
  }

  public showDialog(title: string, content: string, showCancel: boolean): Observable<boolean> {
    let dialogRef: MatDialogRef<DialogComponent>;
    const config = new MatDialogConfig();

    dialogRef = this.dialog.open(DialogComponent, config);
    dialogRef.updatePosition();
    dialogRef.updateSize('300', '300');

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;
    dialogRef.componentInstance.showCancel = showCancel;

    return dialogRef.afterClosed();
  }

  encriptPassword(password) {
    return CryptoJS.SHA256(password).toString();
  }

  formataStringZero(texto: string, tamanho: number) {
    const diff = tamanho - texto.length;
    let result: String = '';
    for (let i = 0; i < diff; i++) {
      result += '0';
    }
    return result + texto;
  }

  tratarErros(message: string): string {
    if (!Number(message)) return 'Ocorreu um erro!\n' + message;
    switch (Number(message)) {
      case EnumErrors.EXISTING_USER.valueOf():
          return 'O usuário informado já existe!';
      case EnumErrors.EXISTING_CLIENT.valueOf():
          return 'O cliente informado já existe!';
      case EnumErrors.EXISTING_RESTAURANT.valueOf():
          return 'O restaurante informado já existe!';
      case EnumErrors.EXISTING_ADDRESS.valueOf():
          return 'O endereço informado já existe!';
      case EnumErrors.USER_NOT_EXISTS.valueOf():
          return 'O usuário informado não existe!';
      case EnumErrors.RESTAURANT_NOT_EXISTS.valueOf():
          return 'O restaurante informado não existe!';
      case EnumErrors.INVALID_RESTAURANT.valueOf():
          return 'Restaurante inválido!';
      case EnumErrors.PARAM_NULL.valueOf():
          return '';
      case EnumErrors.INVALID_USER.valueOf():
          return 'Usuário inválido!';
      case EnumErrors.CLIENT_NOT_EXISTS.valueOf():
          return 'Cliente não existe!';
      case EnumErrors.INVALID_CLIENT.valueOf():
          return 'Cliente inválido!';
      case EnumErrors.EXISTING_GROUP_CLIENT.valueOf():
          return 'Grupo de cliente já existe!';
      case EnumErrors.CLIENT_GROUP_NOT_EXISTS.valueOf():
          return 'Grupo de cliente não existe!';
      case EnumErrors.INVALID_GROUP_CLIENT.valueOf():
          return 'Grupo de cliente inválido!';
      case EnumErrors.GROUP_IS_VALID.valueOf():
          return 'O grupo possui clientes vinculados e não pode ser excluído.';
      case EnumErrors.RESTAURANT_USER_NOT_EXISTS.valueOf():
          return 'Não foram informados usuários para o restaurante.';
      case EnumErrors.CARDAPIO_DATE_BEFORE_TODAY.valueOf():
          return '';
      case EnumErrors.CARDAPIOS_NOT_FOUND_FOR_RESTAURANT.valueOf():
          return 'Não foram encontrados cardápios para esse restaurante.';
      case EnumErrors.INVALID_CARDAPIO.valueOf():
          return 'Cardápio informado inválido.';
      case EnumErrors.CARDAPIOS_NOT_FOUND_FOR_DAY.valueOf():
          return '';
      case EnumErrors.PEDIDO_NOT_EXISTS_FOR_RESTAURANT.valueOf():
          return 'Não existem pedidos para o restaurante.';
      case EnumErrors.CARDAPIO_NOT_EXISTS.valueOf():
          return 'O cardápio não existe!';
      case EnumErrors.PEDIDO_NOT_EXISTS_FOR_CLIENT.valueOf():
          return 'O pedido não existe para o cliente.';
      case EnumErrors.PEDIDO_NOT_EXISTS.valueOf():
          return 'O pedido não existe.';
    }
  }


}

