import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as JWT from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (this.isLogged()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  public isLogged() {
    if (JWT.tokenNotExpired('id_token')) {
      return true;
    }
    localStorage.removeItem('restaurante');
    localStorage.removeItem('userId');
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('id_token');
    return false;
  }
}
