import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../Services/authentification.service';

@Component({
  selector: 'app-menu-dashboard',
  templateUrl: './menu-dashboard.component.html',
  styleUrls: ['./menu-dashboard.component.css']
})
export class MenuDashboardComponent implements OnInit {

  constructor(private auth:AuthentificationService) { }

  ngOnInit(): void {
  }
  log_out(){
    this.auth.log_out();
    console.log('User logged out');
  }
}
