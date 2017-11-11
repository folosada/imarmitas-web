import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-cadastro-restaurante',
  templateUrl: './cadastro-restaurante.component.html',
  styleUrls: ['./cadastro-restaurante.component.css'],
  providers: [UtilsService]
})
export class CadastroRestauranteComponent implements OnInit {

  private razaoSocial: string;
  private nomeFantasia: string;
  private cnpj: string;
  private logradouro: string;
  private numero: number;
  private complemento: string;
  private cidade: string;
  private estado: string;
  private cep: string;
  private telefone: string;
  private usuario: string;
  private senha: string;
  private email: string;

  constructor(private utils: UtilsService) { }

  ngOnInit() {
  }

  salvarRestaurante() {
    alert(this.utils.validaPattern(this.telefone, '\\(\\d{2}\\)((\\d{4}\\d?-\\d{4})|(\\d{4}-\\d{4}\\d?))'));
  }

}
