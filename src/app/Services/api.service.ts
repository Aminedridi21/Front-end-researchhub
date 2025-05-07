import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.get("http://localhost:8090/api/user",{headers});
  }
  get_Article(){
    return this.http.get("http://localhost:8090/api/articles");
  }
  

  add_article(article:any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.post<any>("http://localhost:8090/api/articles", article, {headers})
  }








  }

  

