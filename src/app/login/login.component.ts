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

  constructor(private http:HttpClient,private router:Router,private auth:AuthentificationService,private apiService:ApiService){}
  adminForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })
  
  
  AdminLogin(LoginForm:FormGroup){
    const username = LoginForm.value.username;
    const password = parseInt(LoginForm.value.password);
  //console.log(LoginForm.value);
  this.apiService.user_login(LoginForm.value).subscribe(
    (response)=>{
      console.log(response)
      if(response!=null){
        console.log('mawjoud fil base');
        localStorage.setItem('token',response.token)
        this.router.navigate(['signup']);
      }
      else{
        console.log('mich mawjoud');
        alert('Invalid credentials');
        this.router.navigate(['']);
        
      }
    }
  )
};


}
