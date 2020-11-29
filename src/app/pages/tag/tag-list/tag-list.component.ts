import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/common/services/api.service';

interface Tag {
  tagID: number;
  name: string;
}
@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  tags:any;
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
    this.apiService.get('Tag')
      .subscribe(
        (data: any) => {
          this.tags = data;
        },
        (error: any) => {
          console.log(error);
        });
  }

  edit(id: number) {
    this.router.navigate(['/pages/tag-edit/' + id]);
  }


  delete(id: number) {
    this.apiService.delete('Tag/' + id)
      .subscribe(
        (data: any) => {
          this.toastr.success('Tag Deleted');
          this.getAll();
        },
        (error: any) => {
          console.log(error);
        });
  }

}
