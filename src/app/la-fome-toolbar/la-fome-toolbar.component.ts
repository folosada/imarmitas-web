import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-la-fome-toolbar',
  templateUrl: './la-fome-toolbar.component.html',
  styleUrls: ['./la-fome-toolbar.component.css']  
})
export class LaFomeToolbarComponent implements OnInit {  

  constructor(private router: Router) { }

  ngOnInit() {
  }

  isLogged() {
    return localStorage.getItem("id_token");
  }

  doLogout() {
    localStorage.removeItem("id_token");
    this.router.navigate(['/login']);
  }
}
