import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  
  constructor(private router:Router){}
  
  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getUserRole(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const role = (user.role || '').toLowerCase();
    console.log('User role:', role);
    return role;
  }

  isAdmin(): boolean {
    const isAdmin = this.getUserRole() === 'admin';
    console.log('Is admin:', isAdmin);
    return isAdmin;
  }

  isResearcher(): boolean {
    const isResearcher = this.getUserRole() === 'researcher';
    console.log('Is researcher:', isResearcher);
    return isResearcher;
  }

  isUser(): boolean {
    const isUser = this.getUserRole() === 'user';
    console.log('Is user:', isUser);
    return isUser;
  }

  canAccessDashboard(): boolean {
    const canAccess = this.isAdmin() || this.isResearcher();
    console.log('Can access dashboard:', canAccess);
    return canAccess;
  }

  canManageUsers(): boolean {
    const canManage = this.isAdmin();
    console.log('Can manage users:', canManage);
    return canManage;
  }

  canManageArticles(): boolean {
    const canManage = this.isAdmin() || this.isResearcher();
    console.log('Can manage articles:', canManage);
    return canManage;
  }

  log_out(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.router.navigate(['/'])
  }
}
