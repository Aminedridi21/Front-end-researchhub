import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'datatables.net';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  dtOptions:Config={};
  dtTrigger:Subject<any>=new Subject<any>();
  categories:any;
  users:any;
  recherche:boolean=false;

  constructor(private http:HttpClient,private apiService: ApiService,private router:Router){
    
  }
  Modify_Ticket(value:any){
    this.router.navigate(['/espace-ticket'],{ queryParams: { id:value } });
    }

    ngOnInit(){
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        autoWidth: false,
      };
       
    
      this.apiService.get_Users().subscribe(
        (response)=>{
          this.users=response;
          this.dtTrigger.next(null)
        }
      )
      
  }

  
}
