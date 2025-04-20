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

  constructor(private http:HttpClient,private routes:Router){}
   
    LoginForm = new FormGroup({
      Username: new FormControl(''),
      Password: new FormControl(''),
    })


LogIn(profileForm:FormGroup) {
  
  this.http.get<any>("http://localhost:3000/users")
   .subscribe(res=>{
      const user =res.find((a:any)=>{
      return a.Username===this.LoginForm.value.Username && a.Password === this.LoginForm.value.Password
      });
      if(user){
        this.LoginForm.reset();
        this.routes.navigate(['/dashbord']);

      }
      else{
        window.alert('Incorrect login credentials')
        this.LoginForm.reset();
      }
   
    });
}    
};



