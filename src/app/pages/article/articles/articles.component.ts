import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/common/services/api.service';
import { AuthService } from 'src/app/common/services/auth/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articleData: any = {};
  loading = false;
  submitted = false;
  id = 0;
  userID=0;
  isAddMode = true;
  form = this.formBuilder.group({
    title: ['', Validators.required],
    subTitle: ['', Validators.required],
    shortSummary: ['', Validators.required],
    body: ['', Validators.required],
    tagID: ['', [Validators.required]]
  });

  tags:any=[];
  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
  ) {
    // redirect to home if already logged in
    // if (this.accountService.userValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.getTags();
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.getByID(this.id);
    }

    const user = this.auth.getUserInfo();
    if (user) {
      this.userID = user.UserID;
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;
    // data.role = {
    //   id: 1,
    //   name: 'admin'
    // }i
    if(typeof this.userID==='string'){
      this.userID =parseInt(this.userID);
    }
    data.userID = this.userID;
    data.tagID = parseInt(data.tagID);

    data.articleStatusID= 1,
    data.articleStatus= {
      articleStatusID: 0,
      name: "Na"
    };
    if (this.isAddMode) {
      this.create(data);
    } else {
      this.edit(data);
    }

  }

  create(data:any) {
    this.loading = true;
    this.apiService.post('Article', data)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.toastr.success('Article Created successful');
          this.router.navigate(['/pages/article-list'], { relativeTo: this.route });
        },
        (error: any) => {
          this.loading = false;
          console.log(error);
        });
  }

  edit(data:any) {
    this.loading = true;
    this.apiService.put('Article', this.id, data)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.toastr.success('Article update successful');
          this.router.navigate(['/pages/article-list'], { relativeTo: this.route });
        },
        (error: any) => {
          this.loading = false;
          console.log(error);
        });
  }



  getByID(id: number) {
    this.apiService.get('Article/' + id)
      .subscribe(
        (data: any) => {
          this.articleData = data;
          this.form.patchValue(data);
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
