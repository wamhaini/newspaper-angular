import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from '../common/services/auth/guard.service';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticlesComponent } from './article/articles/articles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { TagComponent } from './tag/addEditTag/tag.component';
import { TagListComponent } from './tag/tag-list/tag-list.component';
import { RegisterComponent } from '../auth/register/register.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { Role } from '../common/model/role';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        canActivate: [GuardService],
        component: DashboardComponent,
      },
      // User
      {
        path: 'user-edit/:id',
        component: RegisterComponent,
        canActivate: [GuardService],
        data: { roles: [Role.admin] }
      },
      {
        path: 'user-list',
        component: UserListComponent,
        canActivate: [GuardService],
        data: { roles: [Role.admin] }
      },
      // Article
      {
        path: 'article',
        component: ArticlesComponent,
        canActivate: [GuardService],
        data: { roles: [Role.admin, Role.journalist] }
      },
      {
        path: 'article-edit/:id',
        component: ArticlesComponent,
        canActivate: [GuardService],
        data: { roles: [Role.admin, Role.journalist] }
      },
      {
        path: 'article-list',
        canActivate: [GuardService],
        component: ArticleListComponent,
        data: { roles: [Role.admin, Role.journalist] }
      },
      // Tag
      {
        path: 'tag',
        component: TagComponent,
        canActivate: [GuardService],
        data: { roles: [Role.admin] }
      },
      {
        path: 'tag-edit/:id',
        component: TagComponent,
        canActivate: [GuardService],
        data: { roles: [Role.admin] }
      },
      {
        path: 'tag-list',
        component: TagListComponent,
        canActivate: [GuardService],
        data: { roles: [Role.admin] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
