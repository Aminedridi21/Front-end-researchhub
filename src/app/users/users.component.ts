import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  
  categories:any;
  users:any;
  recherche:boolean=false;

  constructor(private http:HttpClient,private apiService: ApiService,private router:Router){
    
  }
  //Modify_Ticket(value:any){
   // this.router.navigate(['/espace-ticket'],{ queryParams: { id:value } });
   // }

    ngOnInit(){
      
    
      this.apiService.get_Users().subscribe(
        (response)=>{
          this.users=response;
          
        }
      )
      
  }

  
}
