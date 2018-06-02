import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../../common/auth.guard';

@Component({
  selector: 'app-la-fome-toolbar',
  templateUrl: './la-fome-toolbar.component.html',
  styleUrls: ['./la-fome-toolbar.component.css']  
})
export class LaFomeToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  isLogged() {
    const auth: AuthGuard = new AuthGuard(this.router);
    return auth.isLogged();
  }

  doLogout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('restaurante');
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
