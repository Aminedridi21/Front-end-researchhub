import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) {}
  user_login(LoginForm:any){
    return this.http.post<any>("http://localhost:8090/api/auth/login",{
      email:LoginForm.value.email,
      password:LoginForm.value.password
    });
    }

  
  get_Users(){
      return this.http.get("http://localhost:8090/api/user");
  }
  get_Article(){
    return this.http.get("http://localhost:8090/api/articles");
  }
  
}
