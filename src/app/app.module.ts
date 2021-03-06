import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../common/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Routes
import { AppRoutes } from './app.route';
import { RouterModule } from '@angular/router';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SenhaComponent } from './senha/senha.component';
import { CadastroRestauranteComponent } from './cadastro-restaurante/cadastro-restaurante.component';
import { LaFomeToolbarComponent } from './components/la-fome-toolbar/la-fome-toolbar.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

// Material imports
import { MatCardModule, MatCheckbox, MatCheckboxModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { InicioComponent } from './inicio/inicio.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { TextMaskModule } from 'angular2-text-mask';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { MatExpansionModule } from '@angular/material';
import {MomentTimezoneModule} from 'angular-moment-timezone';
import {MatSelectModule} from '@angular/material/select';
import { RelatorioComponent } from './relatorio/relatorio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SenhaComponent,
    CadastroRestauranteComponent,
    FileUploadComponent,
    DialogComponent,
    InicioComponent,
    CardapioComponent,
    LaFomeToolbarComponent,
    CadastroUsuarioComponent,
    PedidosComponent,
    RelatorioComponent
  ],
  imports: [
    BrowserModule,
    MomentTimezoneModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    TextMaskModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSelectModule,
  ],
  exports: [
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatDialogModule,
    DialogComponent
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, CadastroUsuarioComponent]
})
export class AppModule { }
