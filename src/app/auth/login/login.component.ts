import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/common/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/common/services/data.service';
import { AuthService } from 'src/app/common/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl = '';

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    public dataService: DataService,
    public auth: AuthService 
  ) {
    // redirect to home if already logged in
    const user = this.auth.getUserInfo();
    if (user) {
        this.router.navigate(['/news']);
    }
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  onSubmit(): void {
    if (this.loginForm.status === 'VALID') {
      console.log(this.loginForm.value);
    }

    const data = this.loginForm.value;

    this.apiService.post('User/authenticate', data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.toastr.success('User Login Successful');
          localStorage.setItem('token', response.token);

          this.dataService.setProfileObs(true);

          this.router.navigate(['/pages/dashboard']);
        },
        error => {
          this.toastr.error(error.error.message);
          console.log(error);
        });
  }

}
