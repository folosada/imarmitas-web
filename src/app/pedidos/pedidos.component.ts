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


  //TODO: Adicionar campos de data de filtro no header de Pedidos,
  //à direita (float: right e position: relative)

  //TODO: Adicionar, ao final do card uma opção para listar os itens do pedido
  //Apresentado apenas informações em texto

  pedidos;
  restaurante: Restaurante;
  filtroDataInicial: Date;
  filtroDataFinal: Date;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private pedidosService: PedidosService,
    private utils: UtilsService,
    private snackBar: MatSnackBar) {
    this.restaurante = new Restaurante();
    this.restaurante.initialize(JSON.parse(localStorage.getItem('restaurante')));
    this.buscarPedidos();
  }

  ngOnInit() {
  }

  testes(valor) {
    this.filtroDataFinal = valor;
    console.log(this.filtroDataFinal);
  }

  buscarPedidos() {
    this.pedidosService.buscarPedidos(this.restaurante.id).subscribe(
      response => {
        this.pedidos = response.body;
        console.log(this.pedidos);
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
