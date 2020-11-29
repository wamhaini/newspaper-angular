import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

const baseURL = environment.apiUrl + '/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }


  post(URL: string, data: any): Observable<any> {
    return this.httpClient.post(`${baseURL}/${URL}`, data);
  }

  get(URL: string): Observable<any> {
    return this.httpClient.get(`${baseURL}/${URL}`);
  }

  put(URL: string, id: any, data: any): Observable<any> {
    return this.httpClient.put(`${`${baseURL}/${URL}`}/${id}`, data);
  }

  delete(URL: string): Observable<any> {
    return this.httpClient.delete(`${`${baseURL}/${URL}`}`);
  }

  post_dummy(URL: string, data: any): Observable<any> {
    return new Observable(obs => {
      obs.next({
        premium: data.age + data.death_sum_insured
      });
      obs.complete();
    });
  }

}
