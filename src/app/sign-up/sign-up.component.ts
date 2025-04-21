import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent  {

  role : String ='';
  constructor(private http:HttpClient,private routes:Router){}
    SignupForm = new FormGroup({
      //this.role :"user",
      LastName : new FormControl(''),
      PhoneNumber : new FormControl(''),
      Email : new FormControl(''),
      Username : new FormControl(''),
      Password : new FormControl('')
    })
  
  

  SignUp(SignupForm:FormGroup){
     this.http.post<any>("http://localhost:3000/users",this.SignupForm.value)
     .subscribe(res=>{
      this.routes.navigate(['']);
     })
  }

}
