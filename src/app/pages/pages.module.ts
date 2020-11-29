import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TagListComponent } from './tag/tag-list/tag-list.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ArticlesComponent } from './article/articles/articles.component';
import { TagComponent } from './tag/addEditTag/tag.component';
import { RegisterComponent } from '../auth/register/register.component';


@NgModule({
  declarations: [PagesComponent, DashboardComponent,
    RegisterComponent, ArticlesComponent, TagComponent, TagListComponent, ArticleListComponent, UserListComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
