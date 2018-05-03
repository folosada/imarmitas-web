import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  usuario: Usuario;
  administrador: boolean;
  public exibeAdministrador: boolean;

  constructor(public dialogRef: MatDialogRef<CadastroUsuarioComponent>) {
    this.usuario = new Usuario();
  }

  public carregarDados(usuario: Usuario) {
    this.usuario = usuario;
  }

  ngOnInit() {
  }

  public getUsuario(): Usuario {
    return this.usuario;
  }

  public isAdministrador(): boolean {
    return this.administrador;
  }

}
