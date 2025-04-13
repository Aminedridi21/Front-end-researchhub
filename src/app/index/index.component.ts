import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  menu : String ="";
  tickets:any;
  receivedData: any;
  constructor(private http:HttpClient,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.receivedData = params;
      parseInt(this.receivedData)
      console.log(this.receivedData)
    });
    
     this.http.post("http://localhost:3000/get-pending-tickets",{ etat: 2 }).subscribe(
      (response)=>{
        this.tickets=response;})
   
  }
  download(){
    console.log("download");
   }
   login(){
    this.router.navigate(['login']);
   }
   Signup(){
    this.router.navigate(['signup']);
   }
}
