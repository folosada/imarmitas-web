import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MatCardModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatInputModule } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  storage() {
    alert(localStorage.getItem("id_token"));
  }

  ngOnInit() {
  }

}
