import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { AnalysePdfComponent } from './analyse-pdf/analyse-pdf.component';
import { ProfileComponent } from './profile/profile.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { AssociateArticleComponent } from './associate-article/associate-article.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { 
    path: 'users', 
    component: UsersComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'PDF-Classifier', 
    component: AnalysePdfComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'researcher' }
  },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'article/:id',
    component: ArticleDetailComponent,
    canActivate: [AuthGuard]
  },
  { path: 'associate-article',
    component: AssociateArticleComponent,
    canActivate :[AuthGuard]},
  {
    path: 'edit-article/:id',
    component: EditArticleComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'RESEARCHER' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
