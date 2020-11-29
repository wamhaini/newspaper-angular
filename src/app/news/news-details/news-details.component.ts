import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/services/api.service';
import { AuthService } from 'src/app/common/services/auth/auth.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  articleData: any = {};
  id = 0;
  userID=0;

  tags:any=[];
  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
  ) {

  }

  ngOnInit() {
    this.getTags();
    this.id = this.route.snapshot.params['id'];
    this.getByID(this.id);
    const user = this.auth.getUserInfo();
    if (user) {
      this.userID = user.UserID;
    }
  }

  getByID(id: number) {
    this.apiService.get('Article/' + id)
      .subscribe(
        (data: any) => {
          this.articleData = data;
        },
        (error: any) => {
          // this.toastr.error(error);
          console.log(error);
        });
  }

  

  getTags() {
    this.apiService.get('Tag')
      .subscribe(
        (data: any) => {
          this.articleData = data;
          this.tags=data;
        },
        (error: any) => {
          // this.toastr.error(error);
          console.log(error);
        });
  }

}
