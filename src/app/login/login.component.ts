import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MatCardModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  private errorMessage: string;
  private userId: string;
  private userPassword: string;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.errorMessage = "";
    this.userId = "";
    this.userPassword = "";
  }

  login() {
    if (this.userId == "") {
      this.errorMessage = "Favor informar o usuário!";
    } else if (this.userPassword == "") {
      this.errorMessage = "Favor informar a senha!";
    } else {
      this.errorMessage = "";      
      var status = this.loginService.validarLogin(this.userId, this.userPassword);      
      status.subscribe(
        response => {
          alert(response.id_token);
          this.errorMessage = null;
          localStorage.setItem('id_token', response.id_token);
          localStorage.setItem('userId', this.userId);
          this.router.navigate(['inicio']);
        },
        error => {
          alert(error);
          var errorMessage = JSON.parse(error.text());
          alert(JSON.stringify(errorMessage));
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
  }

  cadastrarUsuario() {
    this.router.navigate(["cadastro"]);
  }

  alterarSenha() {
    this.router.navigate(["senha"]);
  }

}
