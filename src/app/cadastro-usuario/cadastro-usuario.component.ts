import { Component, OnInit } from '@angular/core';
import { MatDialogRef, ErrorStateMatcher } from '@angular/material';
import { Usuario } from '../model/Usuario';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css'],
  providers: [UtilsService]
})
export class CadastroUsuarioComponent implements OnInit {

  usuario: Usuario;
  administrador: boolean;
  public exibeAdministrador: boolean;
  emailValidate: EmailErrorStateMatcher;  

  constructor(public dialogRef: MatDialogRef<CadastroUsuarioComponent>, private utils: UtilsService) {
    this.usuario = new Usuario();
  }

  public carregarDados(usuario: Usuario) {
    this.usuario = usuario;
  }

  ngOnInit() {
  }

  public getUsuario(): Usuario {
    return this.usuario;
  }

  public isAdministrador(): boolean {
    return this.administrador;
  }
  
  blurEmail(event) {    
    this.emailValidate = new EmailErrorStateMatcher(this.utils);
  }

  focusEmail(event) {    
    this.emailValidate = null;    
  }

  obterMensagemErroEmail() {     
    return !this.usuario.email ? "Informe o E-mail" : !this.utils.validaEmail(this.usuario.email) ? "E-mail inválido" : ""    
  }  

  validacaoFormulario() {
    return this.obterMensagemErroEmail() == '' && this.usuario.login !== '' && this.usuario.senha !== '';
  }

}

class EmailErrorStateMatcher implements ErrorStateMatcher { 
  constructor(private utils: UtilsService) {}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // Error when invalid control is dirty, touched, or submitted
    const isSubmitted = form && form.submitted;
    return ((control && (control.dirty || control.touched || isSubmitted)) && (!this.utils.validaEmail(control.value) || control.invalid));
  }
}