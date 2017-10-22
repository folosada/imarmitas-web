import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../common/auth.guard';
import { MatCardModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';

import { AppRoutes } from './app.route';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    MatCardModule,
    MatToolbarModule
  ],
  exports: [
    MatCardModule,
    MatToolbarModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
