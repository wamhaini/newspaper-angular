import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NewsDetailsComponent } from './news/news-details/news-details.component';
import { NewsComponent } from './news/news.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  {
    path: 'pages',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      }
    ],
    // canActivate: [AuthGuard]
  },
  // Route for Auth layout with login, reset password
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'news',
    component: NewsComponent,
    data: { access: 'true' }
  },
  
  {
    path: 'news/:id',
    component: NewsDetailsComponent
  },
  
  {
    path: '**',
    redirectTo: 'pages/news'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
