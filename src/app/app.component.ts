import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './common/services/auth/auth.service';
import { DataService } from './common/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'newspaper';

  constructor(public auth: AuthService, public router: Router, public dataService: DataService) { }
  ngOnInit(): void {
   }

}

