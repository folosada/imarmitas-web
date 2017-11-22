import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CardapioService } from '../service/cardapio/cardapio.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css'],
  providers: [CardapioService]
})
export class CardapioComponent implements OnInit {

  cardapios;
  id_restaurante: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private cardapioService: CardapioService) {
    this.activatedRoute.queryParams.forEach(param => {      
      this.id_restaurante = param.id_restaurante;
    });    
    this.id_restaurante = 3;    
    this.buscarCardapios();
  }
  
  ngOnInit() {
  }

  buscarCardapios() {
    this.cardapioService.buscarCardapios(this.id_restaurante).subscribe(
      response => {
        this.cardapios = response.json();
      }
    );
  }

  formataData(milliseconds) {
    let date = new Date(milliseconds);     
    return date.getUTCDate() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCFullYear();
  }

  voltar() {
    this.router.navigate(['/inicio']);
  }
}
