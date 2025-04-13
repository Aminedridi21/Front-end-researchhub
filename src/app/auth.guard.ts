import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from './Services/authentification.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private router:Router,private auth:AuthentificationService){}
    
   canActivate():boolean{
    if(this.auth.loggedIn()){
      return true;
    }
    else{
      this.router.navigate(['/'])
      return false;
    }
        
   }
  
}
