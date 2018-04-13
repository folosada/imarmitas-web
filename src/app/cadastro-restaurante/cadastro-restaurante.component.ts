import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { UtilsService } from '../utils.service';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { RestauranteService } from '../service/restaurante/restaurante.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { LaFomeToolbarComponent } from '../components/la-fome-toolbar/la-fome-toolbar.component';
import { AuthGuard } from '../../common/auth.guard'
import { Restaurante } from '../model/Restaurante';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-cadastro-restaurante',
  templateUrl: './cadastro-restaurante.component.html',
  styleUrls: ['./cadastro-restaurante.component.css'],
  providers: [UtilsService, FileUploadComponent, ErrorStateMatcher, RestauranteService, MatSnackBar]
})
export class CadastroRestauranteComponent implements OnInit {

  restaurante: Restaurante;
  
  bMudouSenha: boolean = false;

  cnpjValidate: CNPJErrorStateMatcher;
  cepValidate: CEPErrorStateMatcher;
  telefoneValidate: TelefoneErrorStateMatcher;
  emailValidate: EmailErrorStateMatcher;

  usuariosTableList;
  displayedColumns = ['id', 'login', 'email', 'acoes'];  
    
  public cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public phoneMask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /[\d]?/];  

  @ViewChild(FileUploadComponent) fileUpload;

  constructor(private utils: UtilsService,
              private fileUploadComponent: FileUploadComponent,
              private restauranteService: RestauranteService,
              private snackBar: MatSnackBar,
              private router: Router,
              private activatedRoute: ActivatedRoute) { 
    this.restaurante = new Restaurante;    
    this.usuariosTableList = new MatTableDataSource([
      {
        id: 0,
        login: "flavio",
        email: "teste@teste.com",
        administrador: true        
      },
      {
        id: 1,
        login: "leozin",
        email: "leozin@teste.com",
        administrador: false        
      }
    ]);
  }

  ngOnInit() {
    this.carregarDados();
  }

  adicionarUsuario() {}

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
    /*
    if (this.obterMensagemErro().USUARIO) {
      return;
    }
    if (this.obterMensagemErro().SENHA) {
      return;
    }
    if (this.obterMensagemErro().EMAIL) {
      return;
    }
    */
    this.restaurante.logo_file = this.fileUpload.filePreview.nativeElement.src;    
    this.restauranteService.gravarRestaurante(this.restaurante).subscribe(
      response => {                
        this.bMudouSenha = false;
        this.openSnackBar();
        localStorage.setItem("restaurante", JSON.stringify(this.restaurante));
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
      RAZAO_SOCIAL: !this.restaurante.razaoSocial ? "Informe a Razão Social" : "",
      NOME_FANTASIA: !this.restaurante.nomeFantasia ? "Informe o Nome Fantasia" : "",
      CNPJ: !this.restaurante.cnpj ? "Informe o CNPJ" : !this.utils.validaCNPJ(this.restaurante.cnpj) ? "CNPJ inválido" : "",
      LOGRADOURO: !this.restaurante.endereco.logradouro ? "Informe o Logradouro" : "", 
      CIDADE: !this.restaurante.endereco.cidade ? "Informe a Cidade" : "",
      ESTADO: !this.restaurante.endereco.estado ? "Informe o Estado" : "",
      CEP: !this.restaurante.endereco.cep ? "Informe o CEP" : !this.utils.validaCEP(this.restaurante.endereco.cep) ? "CEP inválido" : "",
      TELEFONE: !this.restaurante.telefone ? "Informe o Telefone" : !this.utils.validaTelefone(this.restaurante.telefone) ? "Telefone inválido" : ""      
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