import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../globals';

@Injectable()
export class LayoutService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private global: Globals) { }

  AppsForUser(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'usuario/apps', data);
  }

  ItemForApps(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'itemapps/getitemforapps', data);
  }

  getRolForUser (data): Observable<any> {
    return this.http.post(this.global.urlAPICORE + 'itemapp/', data);
  }

  ItemForAppsW(data): Observable<any> {
    return this.http.get(this.global.urlAPICORE + 'itemapp/' + data);
  }
}
