import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CardapioService } from '../service/cardapio/cardapio.service';
import { UtilsService } from '../utils.service';
import { LaFomeToolbarComponent } from '../la-fome-toolbar/la-fome-toolbar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css'],
  providers: [CardapioService, UtilsService, MatSnackBar]
})
export class CardapioComponent implements OnInit {

  cardapios;  
  inserting: boolean;
  dataCardapio: Date;
  cardapio = {
    id: 0,
    descricao: "",
    dataCardapio: "",
    restaurante: null,
    valor: 0
  }

  constructor(private activatedRoute: ActivatedRoute, 
              private router: Router, 
              private cardapioService: CardapioService,
              private utils: UtilsService,
              private snackBar: MatSnackBar) {
    this.cardapio.restaurante = JSON.parse(localStorage.getItem("restaurante")); 
    this.buscarCardapios();
  }
  
  ngOnInit() {
  }

  buscarCardapios() {
    this.cardapioService.buscarCardapios(this.cardapio.restaurante.id).subscribe(
      response => {
        this.cardapios = response.json();
      },
      error => {
        let errorMessage = JSON.parse(error._body).message;
        this.utils.showDialog("Ops!", "Ocorreu um erro ao buscar os cardápios! =(\n" + errorMessage, false);
      }
    );
  }

  formataData(milliseconds) {
    let date = new Date(milliseconds);     
    return this.utils.formataStringZero((String) (date.getUTCDate()), 2) + '/' + 
           this.utils.formataStringZero((String) (date.getUTCMonth() + 1), 2) + '/' + 
           date.getUTCFullYear();
  }

  voltar() {
    this.router.navigate(['/inicio']);
  }

  novoCardapio() {
    this.inserting = true;
  }

  salvarNovo() {
    this.cardapioService.gravarCardapio(this.cardapio).subscribe(
      response => {
        this.openSnackBar();
        this.buscarCardapios();
        this.inserting = false;    
      }, 
      error => {
        let errorMessage = JSON.parse(error._body).message;
        this.utils.showDialog("Oh não!", "Ocorreu um erro ao tentar salvar o cardápio! ='(\n" + errorMessage, false);
      }
    );  
  }

  cancelarNovo() {
    this.utils.showDialog("Atenção", "Tem certeza que deseja cancelar?", true).subscribe(res => {
      if (res) {
        this.inserting = false;
      }
    });
  }

  openSnackBar() {
    this.snackBar.open("Cardápio adicionado com sucesso!", "", {
      duration: 2500
    });
  }

  openSnackBarRemocao() {
    this.snackBar.open("Cardápio removido com sucesso!", "", {
      duration: 2500
    });
  }  

  removerCardapio(id) {
    this.cardapioService.removerCardapio(id).subscribe(
      response => {
        this.openSnackBarRemocao();
        this.buscarCardapios();
        this.inserting = false;
      }, 
      error => {
        let errorMessage = JSON.parse(error._body).message;
        this.utils.showDialog("Ops! =(", "Ocorreu um erro ao tentar remover o cardápio!\n" + errorMessage, false);
      }
    ); 
  }
}
