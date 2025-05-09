import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthentificationService } from './Services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthentificationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role'];
    
    if (!this.auth.loggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    switch (requiredRole) {
      case 'admin':
        if (!this.auth.isAdmin()) {
          this.router.navigate(['/']);
          return false;
        }
        break;
      case 'researcher':
        if (!this.auth.isResearcher() && !this.auth.isAdmin()) {
          this.router.navigate(['/']);
          return false;
        }
        break;
      case 'user':
        if (!this.auth.isUser() && !this.auth.isResearcher() && !this.auth.isAdmin()) {
          this.router.navigate(['/']);
          return false;
        }
        break;
    }

    return true;
  }
} 