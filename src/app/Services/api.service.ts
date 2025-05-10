import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  addContribution(contribution: any) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  const url = 'http://localhost:8090/api/contribution';
  return this.http.post(url, contribution,{headers,responseType: 'text' });
   }

  

  constructor(private http : HttpClient) {}
  user_login(LoginForm:any){
    return this.http.post<any>("http://localhost:8090/api/auth/login",{
      email:LoginForm.value.email,
      password:LoginForm.value.password
    });
    }

  
  getUsers(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.get<any[]>("http://localhost:8090/api/user",{headers});
  }
  deleteUser(id: number) {
     const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  return this.http.delete(`http://localhost:8090/api/user/${id}`,{headers});
}

updateUser(id: number, userData: any) {
   const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  return this.http.put(`http://localhost:8090/api/user/${id}`, userData,{headers,responseType: 'text' });
}

addUser(userData: any) {
   const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
  return this.http.post(`http://localhost:8090/api/user`, userData,{headers,responseType: 'text' });
}
  get_Article(){
    return this.http.get("http://localhost:8090/api/articles");
  }

  
searchArticles(keyword: string) {
  return this.http.get<any>(
    `http://localhost:8090/api/articles/search/keyword`,
    { params: { keyword } }
  );
}
  

  add_article(article:any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.post<any>("http://localhost:8090/api/articles", article, {headers, observe: 'response'})
  }
  // 🔍 Récupérer un article par ID
getArticleById(id: string) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  return this.http.get<any>(`http://localhost:8090/api/articles/${id}`, { headers });
}

// 🗑️ Supprimer un article par ID
deleteArticle(id: string) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  return this.http.delete(`http://localhost:8090/api/articles/${id}`, { headers, responseType: 'text' });
}
//modifier un article 
updateArticle(id: string, formData: FormData) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  return this.http.put(`http://localhost:8090/api/articles/${id}`, formData, { headers ,
    responseType: 'text' 
  });
}









  }

  

