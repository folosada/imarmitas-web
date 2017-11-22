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
    return false;
  }
}
