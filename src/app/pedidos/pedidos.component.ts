import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PedidosService } from '../service/pedidos/pedidos.service';
import { UtilsService } from '../utils.service';
import { LaFomeToolbarComponent } from '../components/la-fome-toolbar/la-fome-toolbar.component';
import { MatSnackBar } from '@angular/material';
import { Restaurante } from '../model/Restaurante';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  providers: [PedidosService, UtilsService, MatSnackBar]
})
export class PedidosComponent implements OnInit {


  //TODO: Colocar campos de filtro à direita (float: right e position: relative)

  //TODO: Adicionar, ao final do card de cada pedido uma opção para listar os itens do pedido
  //Apresentado apenas informações em texto

  pedidos;
  restaurante: Restaurante;
  filtroDataInicial;
  filtroDataFinal;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private pedidosService: PedidosService,
    private utils: UtilsService,
    private snackBar: MatSnackBar) {
    this.restaurante = new Restaurante();
    console.log(Date.now());
    this.restaurante.initialize(JSON.parse(localStorage.getItem('restaurante')));
    this.buscarPedidos();
  }

  ngOnInit() {
  }

  setDataInicial(data) {
    this.filtroDataInicial = data;
    this.buscarPedidos();
  }

  setDataFinal(data) {
    this.filtroDataFinal = data;
    this.buscarPedidos();
  }

  buscarPedidos() {
    this.pedidosService.buscarPedidos(this.restaurante.id,
      (this.filtroDataInicial) ? Date.parse(this.filtroDataInicial) : 0,
      (this.filtroDataFinal) ? Date.parse(this.filtroDataFinal) : Date.now()).subscribe(
      response => {
        this.pedidos = response.body;
        for (let index = 0; index < this.pedidos.length; index++) {
          const element = this.pedidos[index];
          console.log(element.itensPedido);
        }
      },
      error => {
        const errorMessage = JSON.parse(error.body).message;
        this.utils.showDialog('Ops!', 'Ocorreu um erro ao buscar os pedidos! =(\n' + errorMessage, false);
      }
    );
  }

  voltar() {
    this.router.navigate(['/inicio']);
  }

  formataData(milliseconds) {
    const date = new Date(milliseconds);
    return this.utils.formataStringZero((String)(date.getUTCDate()), 2) + '/' +
      this.utils.formataStringZero((String)(date.getUTCMonth() + 1), 2) + '/' +
      date.getUTCFullYear();
  }

  openSnackBar() {
    this.snackBar.open('Status do pedido alterado com sucesso!', '', {
      duration: 2500
    });
  }

  alterarStatusPedido(id: number, status: number) {
    console.log(status);
    this.pedidosService.alterarStatus(this.restaurante.getUsuario(localStorage.getItem('userId')), id, status).subscribe(
      response => {
        this.openSnackBar();
        this.buscarPedidos();
      },
      error => {
        const errorMessage = JSON.parse(error.body).message;
        this.utils.showDialog('Ops!', 'Ocorreu um erro ao buscar os pedidos! =(\n' + errorMessage, false);
      }
    );
  }
}
