import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../service/pedidos/pedidos.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
  providers: [PedidosService]
})
export class RelatorioComponent implements OnInit {

  public anoFormControl = 0
  public valores = {}
  public total = 0
  constructor(private pedidosService: PedidosService) { }

  ngOnInit() {

    this.anoFormControl = (new Date()).getFullYear();
    this.pedidosService.buscarPedidosYear(this.anoFormControl).subscribe(
      result => {
        //console.log("Result", JSON.stringify(result));
        this.valores = result.body;
        this.addTotalValues();
      }, error => {
        console.log("Error", JSON.stringify(error));
      }
    );
  }

  addTotalValues() {
    this.total = this.valores['0'] + this.valores['1'] + this.valores['2'] + this.valores['3'] + this.valores['4'] + this.valores['5'] + this.valores['6'] + this.valores['7'] + this.valores['8'] + this.valores['9'] + this.valores['10'] + this.valores['11'];
  }


  onAddYear() {
    this.anoFormControl = this.anoFormControl + 1
    this.pedidosService.buscarPedidosYear(this.anoFormControl).subscribe(
      result => {
        //console.log("Result", JSON.stringify(result));
        this.valores = result.body;
        this.addTotalValues();
      }, error => {
        console.log("Error", JSON.stringify(error));
      }
    );
  }

  onSubYear() {
    this.anoFormControl = this.anoFormControl - 1
    this.pedidosService.buscarPedidosYear(this.anoFormControl).subscribe(
      result => {
        //console.log("Result", JSON.stringify(result));
        this.valores = result.body;
        this.addTotalValues();
      }, error => {
        console.log("Error", JSON.stringify(error));
      }
    );
  }
}
