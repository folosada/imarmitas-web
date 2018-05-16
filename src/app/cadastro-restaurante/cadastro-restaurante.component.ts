import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule, MatDialog, MatDialogRef, MatDialogConfig, MatTable, MatTableDataSource } from '@angular/material';
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
import { MatPaginator } from '@angular/material';
import { CadastroUsuarioComponent } from '../cadastro-usuario/cadastro-usuario.component';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import { UsuarioRestaurante } from '../model/UsuarioRestaurante';
import { User } from '../cadastro-usuario/user';

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

  usuariosTableList: MatTableDataSource<User>;
  displayedColumns = ['id', 'login', 'email', 'administrador', 'acoes'];  
    
  public cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public phoneMask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /[\d]?/];    

  @ViewChild(FileUploadComponent) fileUpload;  
  @ViewChild(MatTable) usuariosTable;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private utils: UtilsService,
              private fileUploadComponent: FileUploadComponent,
              private restauranteService: RestauranteService,
              private snackBar: MatSnackBar,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private cadastroUsuarioDialog: MatDialog) { 
    this.restaurante = new Restaurante;              
  }

  ngOnInit() {
    this.carregarDados();
  }

  ngAfterViewInit() {
    this.usuariosTableList.paginator = this.paginator;
  }

  refreshTable() { 
    this.usuariosTableList = new MatTableDataSource(this.usuariosTableList.data);
    this.usuariosTableList.paginator = this.paginator;
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  deletarUsuario(usuario: User) {
    let index = this.usuariosTableList.data.indexOf(usuario);
    this.usuariosTableList.data.splice(index, 1);
    this.restaurante.removerUsuario(usuario.getLogin());
    this.refreshTable();
  }

  adicionarUsuario() {
    let dialogRef: MatDialogRef<CadastroUsuarioComponent>;
    let config = new MatDialogConfig();    
    dialogRef = this.cadastroUsuarioDialog.open(CadastroUsuarioComponent, config);    
    dialogRef.updatePosition();  
    dialogRef.updateSize("450px", "340px");
    if (this.isLogged()) {
      const usuarioLogado: UsuarioRestaurante = JSON.parse(localStorage.getItem("usuarioLogado"));
      dialogRef.componentInstance.exibeAdministrador = usuarioLogado.administrador === 'S';      
    } else {
      dialogRef.componentInstance.exibeAdministrador = true;
    }
    
    return dialogRef.beforeClose().subscribe((ret) => {
      if (ret) {
        dialogRef.componentInstance.getUsuario().senha = this.utils.encriptPassword(dialogRef.componentInstance.getUsuario().senha);
        const usuarioRestaurante = new UsuarioRestaurante(
          dialogRef.componentInstance.getUsuario(), 
          dialogRef.componentInstance.isAdministrador() ? 'S' : 'N');
        this.usuariosTableList.data.push(
          new User(usuarioRestaurante.usuario.id, usuarioRestaurante.usuario.login, usuarioRestaurante.usuario.email, usuarioRestaurante.administrador === 'S')
        );      
        this.refreshTable();      
        return this.restaurante.usuariosRestaurante.push(usuarioRestaurante);      
      }
    });
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
    this.restaurante.logo_file = this.fileUpload.filePreview.nativeElement.src;    
    this.restauranteService.gravarRestaurante(this.restaurante).subscribe(
      response => {                
        this.bMudouSenha = false;
        this.openSnackBar();
        if (this.isLogged()) {
          this.restaurante = new Restaurante();
          this.restaurante.initialize(response.body);
          localStorage.setItem("restaurante", JSON.stringify(this.restaurante));
        }
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
    let table: User[] = new Array<User>();
    if (this.isLogged() && localStorage.getItem("restaurante")) {
      this.restaurante = JSON.parse(localStorage.getItem("restaurante"));      
      this.restaurante.usuariosRestaurante.forEach(usuarioRestaurante => {        
        table.push(new User(usuarioRestaurante.usuario.id, usuarioRestaurante.usuario.login, usuarioRestaurante.usuario.email, usuarioRestaurante.administrador === 'S'));
      });            
    }
    this.usuariosTableList = new MatTableDataSource(table);
  }

  mudouSenha() {
    this.bMudouSenha = true;
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