import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  menu: String ="admin";
  articles:any;
  receivedData: any;
  constructor(private http:HttpClient,private router:Router,private apiService: ApiService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.receivedData = params;
      parseInt(this.receivedData)
      console.log(this.receivedData)
    });
    
     this.apiService.get_Article().subscribe(
      (response)=>{
        this.articles=response;})
   
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
