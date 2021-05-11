import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../globals';

@Injectable()
export class UsersAppsService {
    private headers = new HttpHeaders().set('Content-Type', 'application/json');
    private headers2 = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  constructor(private http: HttpClient, private global: Globals ) { }

  getbyuserid(id: string): Observable<any> {
    return this.http.get(this.global.urlAPI + 'usersapps/getbyuserid/' + id);
  }
  insert(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'usersapps/save', data);
  }
  remove(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'usersapps/delete', data);
  }
}
