import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
  styleUrls: ['./senha.component.css'],
  providers: [LoginService, MatSnackBar]
})
export class SenhaComponent implements OnInit {

  errorMessage: string;
  userId: string;
  userEmail: string;
  userPassword: string;

  constructor(private router: Router, private loginService: LoginService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  voltar() {    
    this.router.navigate(['/']);
  }

  alterarSenha() {
    let values = {
      userId: this.userId,
      userEmail: this.userEmail,
      userPassword: this.userPassword
    }
    var result = this.loginService.alterarSenha(values);
    result.subscribe(
      response => {
        this.openSnackBar();
        this.router.navigate(['/']);
      },
      error => {
        var errorMessage = JSON.parse(error.text());          
        if (errorMessage.result == "data_required"){
          this.errorMessage = "Dados necessários!";
        } else if (errorMessage.result == "invalid_user"){
          this.errorMessage = "Usuário ou senha inválido!";
        }  else {
          this.errorMessage = "Ocorreu um erro :'(";
        }
      }
    );
  }

  openSnackBar() {
    this.snackBar.open("Senha alterada com sucesso!", "", {
      duration: 2500
    });
  }

}
