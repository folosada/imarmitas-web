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
import { AuthGuard } from '../../common/auth.guard';
import { Restaurante } from '../model/Restaurante';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatPaginator } from '@angular/material';
import { CadastroUsuarioComponent } from '../cadastro-usuario/cadastro-usuario.component';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import { UsuarioRestaurante } from '../model/UsuarioRestaurante';
import { User } from '../cadastro-usuario/user';

interface Estado {
  value: String;
  viewValue: String;
}

@Component({
  selector: 'app-cadastro-restaurante',
  templateUrl: './cadastro-restaurante.component.html',
  styleUrls: ['./cadastro-restaurante.component.css'],
  providers: [UtilsService, FileUploadComponent, ErrorStateMatcher, RestauranteService, MatSnackBar]
})
export class CadastroRestauranteComponent implements OnInit {

  restaurante: Restaurante;

  cnpjValidate: CNPJErrorStateMatcher;
  cepValidate: CEPErrorStateMatcher;
  telefoneValidate: TelefoneErrorStateMatcher;

  usuariosTableList: MatTableDataSource<User>;
  userIdLogado: string;
  usuarioLogado: UsuarioRestaurante;
  displayedColumns = ['id', 'login', 'email', 'administrador', 'acoes'];

  estados: Estado[] = [
    {value: 'AC', viewValue: 'Acre'},
    {value: 'AL', viewValue: 'Alagoas'},
    {value: 'AP', viewValue: 'Amapá'},
    {value: 'AM', viewValue: 'Amazonas'},
    {value: 'BA', viewValue: 'Bahia'},
    {value: 'CE', viewValue: 'Ceará'},
    {value: 'DF', viewValue: 'Distrito Federal'},
    {value: 'ES', viewValue: 'Espírito Santo'},
    {value: 'GO', viewValue: 'Goiás'},
    {value: 'MA', viewValue: 'Maranhão'},
    {value: 'MT', viewValue: 'Mato Grosso'},
    {value: 'MS', viewValue: 'Mato Grosso do Sul'},
    {value: 'MG', viewValue: 'Minas Gerais'},
    {value: 'PA', viewValue: 'Pará'},
    {value: 'PB', viewValue: 'Paraíba'},
    {value: 'PR', viewValue: 'Paraná'},
    {value: 'PE', viewValue: 'Pernambuco'},
    {value: 'PI', viewValue: 'Piauí'},
    {value: 'RJ', viewValue: 'Rio de Janeiro'},
    {value: 'RN', viewValue: 'Rio Grande do Norte'},
    {value: 'RS', viewValue: 'Rio Grande do Sul'},
    {value: 'RO', viewValue: 'Rondônia'},
    {value: 'RR', viewValue: 'Roraima'},
    {value: 'SC', viewValue: 'Santa Catarina'},
    {value: 'SP', viewValue: 'São Paulo'},
    {value: 'SE', viewValue: 'Sergipe'},
    {value: 'TO', viewValue: 'Tocantins'}
  ];

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
    if (usuario.getLogin() === this.userIdLogado) {
      this.utils.showDialog('Atenção!', 'Não é possível excluir o usuário logado!', false);
      return;
    }
    if (this.usuarioLogado.administrador === 'S') {
      const index = this.usuariosTableList.data.indexOf(usuario);
      this.usuariosTableList.data.splice(index, 1);
      this.restaurante.removerUsuario(usuario.getLogin());
      this.refreshTable();
    } else {
      this.utils.showDialog('Atenção!', 'Somente usuários administradores podem excluir usuários', false);
    }
  }

  adicionarUsuario() {
    let dialogRef: MatDialogRef<CadastroUsuarioComponent>;
    const config = new MatDialogConfig();
    dialogRef = this.cadastroUsuarioDialog.open(CadastroUsuarioComponent, config);
    dialogRef.updatePosition();
    dialogRef.updateSize('450px', '340px');
    if (this.isLogged()) {
      dialogRef.componentInstance.exibeAdministrador = this.usuarioLogado.administrador === 'S';
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
          new User(usuarioRestaurante.usuario.id,
            usuarioRestaurante.usuario.login,
            usuarioRestaurante.usuario.email,
            usuarioRestaurante.administrador === 'S')
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
    if (!this.restaurante.usuariosRestaurante || !this.restaurante.usuariosRestaurante.length) {
      this.utils.showDialog('Atenção!', 'É necessário informar pelo menos um usuário!', false);
      return;
    }
    this.restaurante.logo_file = this.fileUpload.filePreview.nativeElement.src;
    this.restauranteService.gravarRestaurante(this.restaurante).subscribe(
      response => {
        this.openSnackBar();
        if (this.isLogged()) {
          const restaurante = response.body.restaurante;
          restaurante.usuariosRestaurante = response.body.usuariosRestaurante;
          this.restaurante = new Restaurante();
          this.restaurante.initialize(restaurante);
          localStorage.setItem('restaurante', JSON.stringify(this.restaurante));
          this.router.navigate(['/inicio']);
        } else {
          this.router.navigate(['/inicio']);
        }
      },
      error => {
        const errorMessage = JSON.parse(error._body).message;
        this.utils.showDialog('Ops!', 'Ocorreu um erro! =T\n' + errorMessage, false);
      }
    );
  }

  obterMensagemErro() {
    return {
      RAZAO_SOCIAL: !this.restaurante.razaoSocial ? 'Informe a Razão Social' : '',
      NOME_FANTASIA: !this.restaurante.nomeFantasia ? 'Informe o Nome Fantasia' : '',
      CNPJ: !this.restaurante.cnpj ? 'Informe o CNPJ' : !this.utils.validaCNPJ(this.restaurante.cnpj) ? 'CNPJ inválido' : '',
      LOGRADOURO: !this.restaurante.endereco.logradouro ? 'Informe o Logradouro' : '',
      CIDADE: !this.restaurante.endereco.cidade ? 'Informe a Cidade' : '',
      ESTADO: !this.restaurante.endereco.estado ? 'Informe o Estado' : '',
      CEP: !this.restaurante.endereco.cep ? 'Informe o CEP' : !this.utils.validaCEP(this.restaurante.endereco.cep) ? 'CEP inválido' : '',
      TELEFONE:
      !this.restaurante.telefone ? 'Informe o Telefone' : !this.utils.validaTelefone(this.restaurante.telefone) ? 'Telefone inválido' : ''
    };
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
    this.snackBar.open('Registro salvo com sucesso!', '', {
      duration: 2500
    });
  }

  cancelar() {
    this.utils.showDialog('Atenção!', 'Tem certeza que deseja cancelar?', true).subscribe((response) => {
      if (response) {
        this.router.navigate(['/inicio']);
      }
    });
  }

  isLogged() {
    const auth = new AuthGuard(this.router);
    return auth.isLogged();
  }

  carregarDados() {
    const table: User[] = new Array<User>();
    this.userIdLogado = '';
    this.usuarioLogado = new UsuarioRestaurante();
    if (this.isLogged() && localStorage.getItem('restaurante')) {
      this.userIdLogado = localStorage.getItem('userId');
      this.usuarioLogado.initialize(JSON.parse(localStorage.getItem('usuarioLogado')));
      this.restaurante.initialize(JSON.parse(localStorage.getItem('restaurante')));
      this.restaurante.usuariosRestaurante.forEach(usuarioRestaurante => {
        table.push(new User(
          usuarioRestaurante.usuario.id,
          usuarioRestaurante.usuario.login,
          usuarioRestaurante.usuario.email,
          usuarioRestaurante.administrador === 'S'));
      });
    }
    this.usuariosTableList = new MatTableDataSource(table);
  }

  estadoSelecionado(event) {
    this.restaurante.endereco.estado = event.source.value;
  }
}

class TelefoneErrorStateMatcher implements ErrorStateMatcher {
  constructor(private utils: UtilsService) {}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // Error when invalid control is dirty, touched, or submitted
    const isSubmitted = form && form.submitted;
    return ((control && (control.dirty || control.touched || isSubmitted))
      && (!this.utils.validaTelefone(control.value) || control.invalid));
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