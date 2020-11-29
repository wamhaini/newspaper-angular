import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../common/services/api.service';
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
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsArticles: any = [];
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
    this.getAllNewsArticles();
  }

  getAllNewsArticles() {
    this.apiService.get('Article')
      .subscribe(
        (data: any) => {
          this.newsArticles = data;
        },
        (error: any) => {
          console.log(error);
        });
  }

  detail(id: number) {
    this.router.navigate(['/news/' + id]);
  }




}
