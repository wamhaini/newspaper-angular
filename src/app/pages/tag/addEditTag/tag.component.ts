import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/internal/operators/first';
import { ApiService } from 'src/app/common/services/api.service';
import { DataService } from 'src/app/common/services/data.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  tagData: any = [];
  loading = false;
  submitted = false;
  returnUrl = '';

  id = 0;
  isAddMode = true;

  tagForm = this.formBuilder.group({
    name: ['', Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    public dataService: DataService
  ) {
    // redirect to home if already logged in
    // if (this.accountService.userValue) {
    //     this.router.navigate(['/']);
    // }
  }

  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.getByID(this.id);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.tagForm.controls; }


  onSubmit(): void {
    if (this.tagForm.status === 'VALID') {
      console.log(this.tagForm.value);
    }

    const data = this.tagForm.value;

    if (this.isAddMode) {
      this.create();
    } else {
      this.edit();
    }
  }

  create() {
    this.loading = true;
    this.apiService.post('Tag', this.tagForm.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.toastr.success('Tag Creation successful');
          this.router.navigate(['/pages/tag-list'], { relativeTo: this.route });
        },
        (error: any) => {
          this.loading = false;
          console.log(error);
        });
  }

  edit() {
    this.loading = true;
    const data = this.tagForm.value;
    if(typeof this.id==='string'){
      data.tagID =parseInt(this.id);
    } 
    
    this.apiService.put('Tag', this.id, data)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.toastr.success('Tag updated successful');
          this.router.navigate(['/pages/tag-list'], { relativeTo: this.route });
        },
        (error: any) => {
          this.loading = false;
          console.log(error);
        });
  }


  getByID(id: number) {
    this.apiService.get('Tag/' + id)
      .subscribe(
        (data: any) => {
          this.toastr.success('User fetch successfull');
          this.tagForm.patchValue(data);
        },
        (error: any) => {
          console.log(error);
        });
  }

}
