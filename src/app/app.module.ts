import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../common/auth.guard';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Routes
import { AppRoutes } from './app.route';
import { RouterModule } from '@angular/router';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SenhaComponent } from './senha/senha.component';
import { CadastroRestauranteComponent } from './cadastro-restaurante/cadastro-restaurante.component';

// Material imports
import { MatCardModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MatDialogModule } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SenhaComponent,
    CadastroRestauranteComponent,
    FileUploadComponent,
    DialogComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
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
    HttpModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatDialogModule
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
  entryComponents: [DialogComponent]
})
export class AppModule { }
