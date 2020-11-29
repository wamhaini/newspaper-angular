import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/services/api.service';

interface Article {
  articleID: number;
  articleStatus:string;
  articleStatusID:number;
  body:string;
  shortSummary:string;
  subTitle:string;
  tag:string;
  tagID: number;
  title:string;
  user:string;
  userID: number;
}
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: any = [];
  id = 0;
  isAddMode = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
  ) {

  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.apiService.get('Article')
      .subscribe(
        (data: any) => {
          this.toastr.success('Tags fetch successfull');
          this.articles = data;
        },
        (error: any) => {
          console.log(error);
        });
  }

  edit(id: number) {
    this.router.navigate(['/pages/article-edit/' + id]);
  }


  delete(id: number) {
    this.apiService.delete('Article/' + id)
      .subscribe(
        (data: any) => {
          this.toastr.success('Article Deleted');
          this.getAll();
        },
        (error: any) => {
          console.log(error);
        });
  }

}
