import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {RegisterUser} from '../interface/RegisterUser'

@Injectable({
  providedIn: 'root'
})
export class ServiceProxyService {
  private apiurl = 'https://localhost:44320/api/User';

  constructor(private http: HttpClient) {}

  register(model: RegisterUser): Observable<any> {
    return this.http.post<any>(this.apiurl, model);
  }
}
