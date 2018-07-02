import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CardapioService } from '../service/cardapio/cardapio.service';
import { UtilsService } from '../utils.service';
import { MatSnackBar, MatTableDataSource, MatTable, MatPaginator, MatOption } from '@angular/material';
import { Cardapio } from '../model/Cardapio';
import { DateParserUtil } from '../../common/DateParserUtil';
import { ItemCardapio } from '../model/ItemCardapio';
import { Restaurante } from '../model/Restaurante';

interface DiasSemana {
  value: String;
  viewValue: String;
}

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css'],
  providers: [CardapioService, UtilsService, MatSnackBar]
})

export class CardapioComponent implements OnInit {

  itemCardapioTableList: MatTableDataSource<ItemCardapio>;
  displayedColumns = ['nome', 'acoes'];

  diasSemana: DiasSemana[] = [
    { value: '0', viewValue: 'Domingo' },
    { value: '1', viewValue: 'Segunda-feira' },
    { value: '2', viewValue: 'Terça-feira' },
    { value: '3', viewValue: 'Quarta-feira' },
    { value: '4', viewValue: 'Quinta-feira' },
    { value: '5', viewValue: 'Sexta-feira' },
    { value: '6', viewValue: 'Sábado' }
  ];

  cardapios: Array<Cardapio> = new Array<Cardapio>();
  itensCardapio: Array<ItemCardapio> = new Array<ItemCardapio>();

  inserting: boolean;
  cardapio: Cardapio;
  restaurante: Restaurante;

  nomeItemCardapio: String;


  @ViewChild(MatTable) itemCardapioTable;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private cardapioService: CardapioService,
    private utils: UtilsService,
    private snackBar: MatSnackBar) {
    this.restaurante = new Restaurante();
    this.restaurante.initialize(JSON.parse(localStorage.getItem('restaurante')));
    this.buscarCardapios();
  }

  ngOnInit() {
    this.itemCardapioTableList = new MatTableDataSource(this.itensCardapio);
  }

  ngAfterViewInit() {
    this.itemCardapioTableList.paginator = this.paginator;
  }

  refreshTable() {
    this.itemCardapioTableList = new MatTableDataSource(this.itemCardapioTableList.data);
    this.itemCardapioTableList.paginator = this.paginator;
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  deletarItemCardapio(itemCardapio: ItemCardapio) {
    const index = this.itemCardapioTableList.data.indexOf(itemCardapio);
    this.itemCardapioTableList.data.splice(index, 1);
    this.refreshTable();
  }

  adicionarItemCardapio() {
    if (!this.nomeItemCardapio) {
      this.utils.showDialog('Atenção', 'Deve ser informado o nome do item.', false);
      return false;
    }

    const itemCardapio: ItemCardapio = new ItemCardapio();
    itemCardapio.nome = this.nomeItemCardapio;
    this.itensCardapio.push(itemCardapio);
    this.nomeItemCardapio = '';
    this.refreshTable();
  }

  buscarCardapios() {
    let qualquercoisa = true;
    this.cardapioService.buscarCardapios(this.restaurante.id).subscribe(
      response => {
        if (response.body != null) {
          this.cardapios = new Array<Cardapio>();
          response.body.forEach(cardapio => {
            const car = new Cardapio();
            car.initialize(cardapio);
            this.cardapios.push(car);
          });

          console.log('Cardapios:', JSON.stringify(this.cardapios));
        }
      },
      error => {
        this.utils.showDialog('Ops!', this.utils.tratarErros(error.error.message), false);
      }
    );
  }

  public getDiaSemana(diaSemanaValue) {
    let diaSemana: String = '';

    switch (diaSemanaValue) {
      case 0: diaSemana = this.diasSemana[0].viewValue; break;
      case 1: diaSemana = this.diasSemana[1].viewValue; break;
      case 2: diaSemana = this.diasSemana[2].viewValue; break;
      case 3: diaSemana = this.diasSemana[3].viewValue; break;
      case 4: diaSemana = this.diasSemana[4].viewValue; break;
      case 5: diaSemana = this.diasSemana[5].viewValue; break;
      case 6: diaSemana = this.diasSemana[6].viewValue; break;
    }

    return diaSemana;
  }

  voltar() {
    this.router.navigate(['/inicio']);
  }

  novoCardapio() {
    if (this.cardapio && this.temDados()) {
      this.utils.showDialog('Atenção', 'Existem dados inseridos, deseja realmente criar um novo cardápio?', true).subscribe(res => {
        if (!res) {
          return false;
        }
      });
    }

    this.cardapio = new Cardapio();
    this.inserting = true;
  }

  salvarNovo() {

    if (!this.validaCampos()) {
      return;
    }

    console.log(this.cardapio);

    this.cardapio.itensCardapio = this.itensCardapio;
    this.cardapio.restaurante = this.restaurante;

    this.cardapioService.gravarCardapio(this.cardapio).subscribe(
      response => {
        this.openSnackBar();
        this.buscarCardapios();
        this.inserting = false;
        this.limparCampos();
      },
      error => {
        console.log(JSON.parse(error));
        this.utils.showDialog('Oh não!', this.utils.tratarErros(error.error.message), false);
      }
    );
  }

  cancelarNovo() {
    this.utils.showDialog('Atenção', 'Tem certeza que deseja cancelar?', true).subscribe(res => {
      if (res) {
        this.inserting = false;
      }
    });
  }

  openSnackBar() {
    this.snackBar.open('Cardápio adicionado com sucesso!', '', {
      duration: 2500
    });
  }

  openSnackBarRemocao() {
    this.snackBar.open('Cardápio removido com sucesso!', '', {
      duration: 2500
    });
  }

  removerCardapio(cardapio) {
    this.cardapioService.contemPedidosPendentes(cardapio).subscribe(
      response => {
        if (response.body) {
          this.utils.showDialog('Atenção',
            'Existem pedidos pendentes para este cardápio. Deseja removê-lo mesmo assim?', true)
            .subscribe(res => {
              if (res) {
                this.cardapioService.removerCardapio(cardapio).subscribe(
                  response => {
                    this.openSnackBarRemocao();
                    this.buscarCardapios();
                    this.inserting = false;
                  },
                  error => {
                    this.utils.showDialog('Ops!', this.utils.tratarErros(error.error.message), false);
                  });
              }
            });
        } else {
          this.cardapioService.removerCardapio(cardapio).subscribe(
            response => {
              this.openSnackBarRemocao();
              this.buscarCardapios();
              this.inserting = false;
            },
            error => {
              this.utils.showDialog('Ops!', this.utils.tratarErros(error.error.message), false);
            }
          );
        }
      }, error => {
        this.utils.showDialog('Ops!', this.utils.tratarErros(error.error.message), false);
      }
    );
  }

  limparCampos() {
    this.cardapio = new Cardapio();
    this.itensCardapio = new Array<ItemCardapio>();
    this.itemCardapioTableList = new MatTableDataSource(this.itensCardapio);
  }

  validaCampos() {
    if (!this.cardapio.diaSemana) {
      this.utils.showDialog('Atenção', 'Dia da semana deve ser informado.', false);
      return false;
    }

    if (!this.cardapio.valor || this.cardapio.valor === 0) {
      this.utils.showDialog('Atenção', 'Valor do prato deve ser informado.', false);
      return false;
    }

    if (!this.cardapio.descricao) {
      this.utils.showDialog('Atenção', 'Descrição deve ser informada.', false);
      return false;
    }

    if (this.itensCardapio.length === 0) {
      this.utils.showDialog('Atenção', 'Deve ser informado pelo menos um item.', false);
      return false;
    }

    return true;
  }

  temDados() {
    if (this.cardapio.diaSemana) {
      return true;
    }

    if (this.cardapio.valor || this.cardapio.valor > 0) {
      return true;
    }

    if (this.cardapio.descricao) {
      return true;
    }

    if (this.itensCardapio.length > 0) {
      return true;
    }

    return false;
  }

  diaSelecionado(event) {
    this.cardapio.diaSemana = event.source.value;
  }
}