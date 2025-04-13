import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  
  constructor(private router:Router){}
  
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  log_out(){
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
}
