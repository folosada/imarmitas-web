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

@Component({
  selector: 'app-cadastro-restaurante',
  templateUrl: './cadastro-restaurante.component.html',
  styleUrls: ['./cadastro-restaurante.component.css'],
  providers: [UtilsService, FileUploadComponent, ErrorStateMatcher, RestauranteService, MatSnackBar]
})
export class CadastroRestauranteComponent implements OnInit {

  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  logradouro: string;
  numero: number;
  complemento: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  usuario: string;
  senha: string;
  email: string;
  file: string;

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
      razaoSocial: this.razaoSocial,
      nomeFantasia: this.nomeFantasia,
      cnpj: this.cnpj,
      endereco: {
        logradouro: this.logradouro,
        cidade: this.cidade,
        estado: this.estado,
        cep: this.cep,
        numero: this.numero,
        complemento: this.complemento        
      },
      telefone: this.telefone,
      usuario: {
        login: this.usuario,
        senha: this.utils.encriptPassword(this.senha),
        email: this.email
      }
    }  
    this.restauranteService.gravarRestaurante(params).subscribe(
      response => {        
        //this.utils.convertImageToBase64(this.fileUploadComponent.upload(this.fileUpload));        
        this.openSnackBar();
        this.router.navigate(['/inicio']);
      },
      error => {
        var errorMessage = JSON.parse(error.text());          
        if (errorMessage.result == "data_required"){
          errorMessage = "Dados necessários!";
        } else if (errorMessage.result == "invalid_user"){
          errorMessage = "Usuário ou senha inválido!";
        }  else {
          errorMessage = "Ocorreu um erro :'(";
        }
        this.utils.showDialog("Ops!", errorMessage, false);
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
        this.router.navigate(['/inicio']);
      }
    });
  }

  isLogged() {
    return localStorage.getItem("id_token");
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