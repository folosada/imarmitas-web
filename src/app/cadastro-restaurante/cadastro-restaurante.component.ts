import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { UtilsService } from '../utils.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { RestauranteService } from '../service/restaurante/restaurante.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { LaFomeToolbarComponent } from '../la-fome-toolbar/la-fome-toolbar.component';
import { AuthGuard } from '../../common/auth.guard'

@Component({
  selector: 'app-cadastro-restaurante',
  templateUrl: './cadastro-restaurante.component.html',
  styleUrls: ['./cadastro-restaurante.component.css'],
  providers: [UtilsService, FileUploadComponent, ErrorStateMatcher, RestauranteService, MatSnackBar]
})
export class CadastroRestauranteComponent implements OnInit {

  id: number = 0;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  id_endereco: number = 0;
  logradouro: string;
  numero: number;
  complemento: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  id_usuario: number = 0;
  usuario: string;
  senha: string;
  email: string;    
  logo_file;
  restaurante;
  bMudouSenha: boolean = false;

  cnpjValidate: CNPJErrorStateMatcher;
  cepValidate: CEPErrorStateMatcher;
  telefoneValidate: TelefoneErrorStateMatcher;
  emailValidate: EmailErrorStateMatcher;

  @ViewChild(FileUploadComponent) fileUpload;

  constructor(private utils: UtilsService,
              private fileUploadComponent: FileUploadComponent,
              private restauranteService: RestauranteService,
              private snackBar: MatSnackBar,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.carregarDados();
  }

  salvarRestaurante() {    
    if (this.obterMensagemErro().RAZAO_SOCIAL) {
      return;
    }  
    if (this.obterMensagemErro().NOME_FANTASIA) {
      return;
    }  
    if (this.obterMensagemErro().CNPJ) {
      return;
    }
    if (this.obterMensagemErro().LOGRADOURO) {
      return;
    }
    if (this.obterMensagemErro().CIDADE) {
      return;
    }
    if (this.obterMensagemErro().ESTADO) {
      return;
    }
    if (this.obterMensagemErro().CEP) {
      return;
    }
    if (this.obterMensagemErro().TELEFONE) {
      return;
    }
    if (this.obterMensagemErro().USUARIO) {
      return;
    }
    if (this.obterMensagemErro().SENHA) {
      return;
    }
    if (this.obterMensagemErro().EMAIL) {
      return;
    }
    const params = {
      id: this.id,
      razaoSocial: this.razaoSocial,
      nomeFantasia: this.nomeFantasia,
      cnpj: this.cnpj,
      endereco: {
        id: this.id_endereco,
        logradouro: this.logradouro,
        cidade: this.cidade,
        estado: this.estado,
        cep: this.cep,
        numero: this.numero,
        complemento: this.complemento        
      },
      telefone: this.telefone,
      logo_file: this.fileUpload.filePreview.nativeElement.src,
      usuario: {
        id: this.id_usuario,
        login: this.usuario,
        senha: this.bMudouSenha ? this.utils.encriptPassword(this.senha) : this.senha,
        email: this.email
      }
    }  
    this.restauranteService.gravarRestaurante(params).subscribe(
      response => {                
        this.bMudouSenha = false;
        this.openSnackBar();
        localStorage.setItem("restaurante", JSON.stringify(params));
        this.router.navigate(['/inicio']);
      },
      error => {        
        var errorMessage = JSON.parse(error._body).message;        
        this.utils.showDialog("Ops!", "Ocorreu um erro! =T\n" + errorMessage, false);
      }
    )    
  }

  obterMensagemErro() { 
    return {
      RAZAO_SOCIAL: !this.razaoSocial ? "Informe a Razão Social" : "",
      NOME_FANTASIA: !this.nomeFantasia ? "Informe o Nome Fantasia" : "",
      CNPJ: !this.cnpj ? "Informe o CNPJ" : !this.utils.validaCNPJ(this.cnpj) ? "CNPJ inválido" : "",
      LOGRADOURO: !this.logradouro ? "Informe o Logradouro" : "", 
      CIDADE: !this.cidade ? "Informe a Cidade" : "",
      ESTADO: !this.estado ? "Informe o Estado" : "",
      CEP: !this.cep ? "Informe o CEP" : !this.utils.validaCEP(this.cep) ? "CEP inválido" : "",
      TELEFONE: !this.telefone ? "Informe o Telefone" : !this.utils.validaTelefone(this.telefone) ? "Telefone inválido" : "",
      USUARIO: !this.usuario ? "Informe o Usuário" : "",
      SENHA: !this.senha ? "Informe a Senha" : "",
      EMAIL: !this.email ? "Informe o E-mail" : !this.utils.validaEmail(this.email) ? "E-mail inválido" : ""
    }
  }  

  blurCNPJ(event) {    
    this.cnpjValidate = new CNPJErrorStateMatcher(this.utils);
  }

  focusCNPJ(event) {    
    this.cnpjValidate = null;    
  }

  blurCEP(event) {    
    this.cepValidate = new CEPErrorStateMatcher(this.utils);
  }

  focusCEP(event) {    
    this.cepValidate = null;    
  }

  blurTelefone(event) {    
    this.telefoneValidate = new TelefoneErrorStateMatcher(this.utils);
  }

  focusTelefone(event) {    
    this.telefoneValidate = null;    
  }

  blurEmail(event) {    
    this.emailValidate = new EmailErrorStateMatcher(this.utils);
  }

  focusEmail(event) {    
    this.emailValidate = null;    
  }

  openSnackBar() {
    this.snackBar.open("Registro salvo com sucesso!", "", {
      duration: 2500
    });
  }

  cancelar() {
    this.utils.showDialog("Atenção!", "Tem certeza que deseja cancelar?", true).subscribe((response) => {
      if (response) {
        this.bMudouSenha = false;
        this.router.navigate(['/inicio']);
      }
    });
  }

  isLogged() {
    let auth = new AuthGuard(this.router);
    return auth.isLogged();
  }

  carregarDados() {
    if (this.isLogged() && localStorage.getItem("restaurante")) {
      this.restaurante = JSON.parse(localStorage.getItem("restaurante"));
      this.id = this.restaurante.id;
      this.nomeFantasia = this.restaurante.nomeFantasia;
      this.razaoSocial = this.restaurante.razaoSocial;
      this.cnpj = this.restaurante.cnpj;
      this.id_endereco = this.restaurante.endereco.id;
      this.logradouro = this.restaurante.endereco.logradouro;
      this.cidade = this.restaurante.endereco.cidade;
      this.estado = this.restaurante.endereco.estado;
      this.cep = this.restaurante.endereco.cep;
      this.numero = this.restaurante.endereco.numero;
      this.complemento = this.restaurante.endereco.complemento;
      this.telefone = this.restaurante.telefone;
      this.logo_file = this.restaurante.logo_file;
      this.id_usuario = this.restaurante.usuario.id;
      this.usuario = this.restaurante.usuario.login;
      this.senha = this.restaurante.usuario.senha;
      this.email = this.restaurante.usuario.email;
      this.fileUpload.filePreview.nativeElement.src = this.restaurante.logo_file;
    }
  }

  mudouSenha() {
    this.bMudouSenha = true;
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

class TelefoneErrorStateMatcher implements ErrorStateMatcher {  
  constructor(private utils: UtilsService) {}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // Error when invalid control is dirty, touched, or submitted
    const isSubmitted = form && form.submitted;
    return ((control && (control.dirty || control.touched || isSubmitted)) && (!this.utils.validaTelefone(control.value) || control.invalid));
  }
}

class CEPErrorStateMatcher implements ErrorStateMatcher {    
  constructor(private utils: UtilsService) {}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // Error when invalid control is dirty, touched, or submitted
    const isSubmitted = form && form.submitted;
    return ((control && (control.dirty || control.touched || isSubmitted)) && (!this.utils.validaCEP(control.value) || control.invalid));
  }
}

class CNPJErrorStateMatcher implements ErrorStateMatcher {    
  constructor(private utils: UtilsService) {}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // Error when invalid control is dirty, touched, or submitted
    const isSubmitted = form && form.submitted;
    return ((control && (control.dirty || control.touched || isSubmitted)) && (!this.utils.validaCNPJ(control.value) || control.invalid));
  }
}