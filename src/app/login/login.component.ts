import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../Services/authentification.service';
import { ApiService } from '../Services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private http:HttpClient,private apiService:ApiService,private routes:Router){}
   
    LoginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    })


LogIn(LoginForm:FormGroup) {
  console.log(LoginForm);
  this.apiService.user_login(LoginForm).subscribe(
    (response)=>{
      console.log(response)
      if(response!=null){
        console.log('mawjoud fil base');
        localStorage.setItem('token',response.accessToken)
        this.routes.navigate(['']);
      }
      else{
        console.log('mich mawjoud');
        alert('Invalid credentials');
        this.routes.navigate(['login']);
        
      }})
    
}
};



