import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as JWT from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (JWT.tokenNotExpired("id_token")) {
      return true;
    }

    this.router.navigate(['/login']);
    localStorage.removeItem("restaurante");
    localStorage.removeItem("id_token");
    return false;
  }

  public isLogged() {
    if (JWT.tokenNotExpired("id_token")) {
      return true;
    } 
    return false;
  }
}
