import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoginService } from '../service/login/login.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
  styleUrls: ['./senha.component.css'],
  providers: [LoginService, MatSnackBar, UtilsService]
})
export class SenhaComponent implements OnInit {

  errorMessage: string;
  userId: string;
  userEmail: string;
  userPassword: string;

  constructor(private router: Router, private loginService: LoginService, public snackBar: MatSnackBar, private utils: UtilsService) { }

  ngOnInit() {
  }

  voltar() {
    this.router.navigate(['/']);
  }

  alterarSenha() {
    const values = {
      login: this.userId,
      email: this.userEmail,
      senha: this.utils.encriptPassword(this.userPassword)
    };
    const result = this.loginService.alterarSenha(values);
    result.subscribe(
      response => {
        this.openSnackBar();
        this.router.navigate(['/']);
      },
      error => {
        this.errorMessage = this.utils.tratarErros(error.error.message);
      }
    );
  }

  openSnackBar() {
    this.snackBar.open('Senha alterada com sucesso!', '', {
      duration: 2500
    });
  }

}
