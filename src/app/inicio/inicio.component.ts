import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LaFomeToolbarComponent } from '../components/la-fome-toolbar/la-fome-toolbar.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  restaurante;

  constructor(private router: Router) { 
    this.restaurante = JSON.parse(localStorage.getItem("restaurante"));
  }

  ngOnInit() {
  }

  entrar(tela) {
    switch (tela) {
      case 1: this.router.navigate(['/cadastro']); break;
      case 2: this.router.navigate(['/cardapio']); break;
      case 3: this.router.navigate(['/pedido']); break;
      case 4: this.router.navigate(['/relatorio']); break;
    }
  }

}
